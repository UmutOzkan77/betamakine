"""Static regression checks independent of the renderer."""
from pathlib import Path
from urllib.parse import urlsplit, urljoin, unquote
from collections import Counter
import json, subprocess, hashlib, xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'_site_src/content.json').read_text())
routes=json.loads((ROOT/'_site_src/routes.json').read_text())
DOMAIN='https://www.betamakine.com'
errors=[]; titles=[]; descriptions=[]; checked=0; schemas=0
def check(ok,message):
 if not ok:errors.append(message)
def path_for(route):
 p=ROOT/route.lstrip('/')
 return p/'index.html' if p.is_dir() else p
def doc(route):return BeautifulSoup(path_for(route).read_text(),'html.parser')
cache={r:doc(r) for r in routes+['/404.html','/oto-yikama-pervanesi-boom-tekli/','/oto-yikama-pervanesi-boom-ciftli/']}
for route,s in cache.items():
 check(len(s.select('h1'))==1,route+': expected one H1')
 check(s.html.get('lang')=='tr',route+': lang')
 check(bool(s.select_one('meta[name="viewport"]')),route+': viewport')
 check(bool(s.main),route+': main landmark')
 if route in routes:
  titles.append(s.title.get_text());descriptions.append(s.select_one('meta[name="description"]')['content'])
  check(s.select_one('link[rel="canonical"]')['href']==DOMAIN+route,route+': canonical')
  check('noindex' not in s.select_one('meta[name="robots"]')['content'],route+': noindex')
  check(len(s.select('.whatsapp-link'))==1,route+': WhatsApp link')
  check(not s.select('.seo-cluster-links,.whatsapp-float-button'),route+': legacy overlay')
  ids=[n['id'] for n in s.select('[id]')];check(len(ids)==len(set(ids)),route+': duplicate ID')
  for image in s.select('img'):
   check(bool(image.get('alt')),route+': missing alt')
   check(image.get('width') and image.get('height'),route+': missing dimensions')
  visible=s.main.get_text(' ',strip=True)
  for junk in ['AI İçin','İçerik Fikirleri','Apple tarzında','Google\'da','Arama Niyeti']:
   check(junk not in visible,route+': editorial artifact '+junk)
 for node in s.select('[href],[src]'):
  target=node.get('href') or node.get('src');u=urlsplit(urljoin(DOMAIN+route,target))
  if u.scheme not in ('https','http') or u.netloc not in ('www.betamakine.com','betamakine.com'):continue
  p=path_for(unquote(u.path)); checked+=1
  check(p.is_file(),route+': broken local URL '+target)
  if u.fragment and p.suffix=='.html' and p.is_file():
   targetdoc=cache.get(u.path) or BeautifulSoup(p.read_text(),'html.parser')
   check(bool(targetdoc.find(id=unquote(u.fragment))),route+': missing anchor '+target)
 for block in s.select('script[type="application/ld+json"]'):
  j=json.loads(block.string);schemas+=1
  check(j.get('@context')=='https://schema.org',route+': context')
  for entity in j.get('@graph',[]):
   if entity.get('@type')=='Product':check(not any(k in entity for k in ['offers','review','aggregateRating']),route+': unverified commerce schema')
   if entity.get('@type')=='FAQPage':
    for f in entity['mainEntity']:
     check(f['name'] in s.get_text(' ',strip=True),route+': FAQ not visible')
     check(f['acceptedAnswer']['text'] in s.get_text(' ',strip=True),route+': FAQ answer mismatch')
for p in DATA['products']:
 s=cache[p['route']]
 original_html=subprocess.check_output(['git','show',DATA['baseline']+':'+p['route'].lstrip('/')+'index.html'],cwd=ROOT,text=True)
 old=BeautifulSoup(original_html,'html.parser').select_one('.product-description').get_text(' ',strip=True)
 new=s.select_one('.product-description').get_text(' ',strip=True)
 check(old==new,p['route']+': product description changed')
 gallery=[unquote(n['data-gallery-src']) for n in s.select('[data-gallery-src]')]
 check(gallery==p['images'],p['route']+': product gallery changed')
 for file in p['images']:
  old_bytes=subprocess.check_output(['git','show',DATA['baseline']+':'+file.lstrip('/')],cwd=ROOT)
  check(old_bytes==(ROOT/file.lstrip('/')).read_bytes(),file+': image bytes changed')
check(len(titles)==len(set(titles)),'duplicate titles')
check(len(descriptions)==len(set(descriptions)),'duplicate descriptions')
check(len(routes)==32,'indexable route count changed')
sitemap=ET.parse(ROOT/'sitemap.xml');locs=[n.text for n in sitemap.findall('.//{*}loc')]
check(set(locs)=={DOMAIN+r for r in routes},'sitemap mismatch')
check('Sitemap: '+DOMAIN+'/sitemap.xml' in (ROOT/'robots.txt').read_text(),'robots sitemap')
check((ROOT/'CNAME').read_text().strip()=='www.betamakine.com','production domain changed')
check((ROOT/'assets/css/style.css').stat().st_size<25000,'CSS budget')
check((ROOT/'assets/js/script.js').stat().st_size<6000,'JS budget')
report={'html_pages':len(cache),'indexable_routes':len(routes),'checked_local_references':checked,'json_ld_blocks':schemas,'protected_products':len(DATA['products']),'protected_product_images':sum(len(p['images']) for p in DATA['products']),'duplicate_titles':len(titles)-len(set(titles)),'duplicate_descriptions':len(descriptions)-len(set(descriptions)),'css_bytes':(ROOT/'assets/css/style.css').stat().st_size,'js_bytes':(ROOT/'assets/js/script.js').stat().st_size,'errors':errors}
print(json.dumps(report,ensure_ascii=False,indent=2))
(ROOT/'_site_src/verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
raise SystemExit(bool(errors))
