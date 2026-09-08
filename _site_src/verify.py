"""Static regression checks independent of the renderer."""
from pathlib import Path
from urllib.parse import urlsplit, urljoin, unquote
from collections import Counter
import json, subprocess, hashlib, re, xml.etree.ElementTree as ET
from urllib.robotparser import RobotFileParser
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
  corner=s.select('a.whatsapp-corner')
  check(len(corner)==1,route+': expected one corner WhatsApp shortcut')
  if corner:
   check(corner[0].get('href')=='https://wa.me/905364615330',route+': corner WhatsApp destination')
   check(corner[0].get_text(strip=True)=='Bize WhatsApp’tan ulaşın',route+': corner WhatsApp label')
   check(bool(corner[0].svg),route+': corner WhatsApp logo')
   check(corner[0].get('target')=='_blank' and 'noopener' in corner[0].get('rel',[]),route+': safe external WhatsApp link')
  check(not s.select('.seo-cluster-links,.whatsapp-float-button'),route+': legacy overlay')
  menu=s.select_one('button.menu-toggle')
  panel=s.select_one('dialog#mobile-menu')
  check(bool(menu and panel),route+': accessible mobile menu missing')
  if menu and panel:
   check(menu.get('aria-controls')==panel.get('id') and menu.get('aria-haspopup')=='dialog',route+': mobile menu relationship')
   check(bool(s.find(id=panel.get('aria-labelledby'))),route+': dialog name')
   check(bool(panel.select_one('button.menu-close')),route+': menu close button')
  check(len(s.select('link[rel="preload"][as="font"]'))==2,route+': local font preloads')
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
sitemap=ET.parse(ROOT/'sitemap.xml');locs=[n.text for n in sitemap.findall('./{*}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
check(set(locs)=={DOMAIN+r for r in routes},'sitemap mismatch')
check('Sitemap: '+DOMAIN+'/sitemap.xml' in (ROOT/'robots.txt').read_text(),'robots sitemap')
check((ROOT/'CNAME').read_text().strip()=='www.betamakine.com','production domain changed')
# Local font declarations and the accessible dialog add styles; retain a bounded
# 32 KB uncompressed stylesheet and the existing 6 KB JavaScript limit.
check((ROOT/'assets/css/style.css').stat().st_size<32000,'CSS budget')
font_files=list((ROOT/'assets/fonts').glob('*.woff2'))
check(len(font_files)==4 and sum(p.stat().st_size for p in font_files)<100000,'local font budget')
check('Arial Narrow' not in (ROOT/'assets/css/style.css').read_text(),'condensed font regression')
check((ROOT/'assets/css/knowledge.css').stat().st_size<7000,'knowledge CSS budget')
check(sum(p.stat().st_size for p in (ROOT/'assets/images/guides').glob('*.webp'))<160000,'editorial image budget')
guide_routes=[r for r in routes if r.startswith('/blog/') and r!='/blog/']
for route in guide_routes:
 s=cache[route]
 check(bool(s.select_one('.article-cover img')),route+': guide cover missing')
 check(bool(s.select_one('.guide-figure img')),route+': inline illustration missing')
 check(len(s.select('.answer-box li'))==3,route+': short answer missing')
 graph=json.loads(s.select_one('script[type="application/ld+json"]').string)['@graph']
 article=next((x for x in graph if 'BlogPosting' in x.get('@type',[])),None)
 check(bool(article),route+': article schema missing')
 if article:
  check(article['image']==urljoin(DOMAIN,s.select_one('.article-cover img')['src']),route+': article image mismatch')
  check(article['image']==s.select_one('meta[property="og:image"]')['content'],route+': social image mismatch')
  check(article['abstract']==' '.join(n.get_text(' ',strip=True) for n in s.select('.answer-box li')),route+': abstract not visible')
  check(article['headline']==s.h1.get_text(' ',strip=True),route+': article headline mismatch')
 if '/assets/images/guides/' in s.select_one('.guide-figure img')['src']:
  check('temsili' in s.select_one('.guide-figure figcaption').get_text(),route+': generated illustration disclosure')
check(len(cache['/blog/'].select('.knowledge-card'))==18,'guide card count')
for node in sitemap.findall('./{*}url'):
 route=node.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text.removeprefix(DOMAIN)
 actual={n.text for n in node.findall('./{http://www.google.com/schemas/sitemap-image/1.1}image/{http://www.google.com/schemas/sitemap-image/1.1}loc')}
 expected={urljoin(DOMAIN,i['src']) for i in cache[route].select('main img[src]')}
 check(actual==expected,route+': image sitemap mismatch')
for file in ['llms.txt','llms-full.txt']:
 content=(ROOT/file).read_text()
 check(content.startswith('# Beta Makine\n\n> '),file+': LLM format')
 for name,url,description in re.findall(r'^- \[([^\]]+)\]\(([^)]+)\): (.+)$',content,re.M):
  check(url.startswith(DOMAIN+'/'),file+': noncanonical URL')
  check(path_for(unquote(urlsplit(url).path)).is_file(),file+': broken source '+url)
  check(bool(description.strip()),file+': empty description')
llms=(ROOT/'llms.txt').read_text();full=(ROOT/'llms-full.txt').read_text()
check(10<=len(re.findall(r'^- \[',llms,re.M))<=30,'LLM index entry count')
for route in routes:check(']('+DOMAIN+route+'):' in full,route+': missing full LLM entry')
robots=RobotFileParser();robots.parse((ROOT/'robots.txt').read_text().splitlines())
for bot in ['Googlebot','Bingbot','OAI-SearchBot','ChatGPT-User','PerplexityBot','Claude-SearchBot']:
 for route in routes+['/llms.txt','/llms-full.txt']:
  check(robots.can_fetch(bot,DOMAIN+route),bot+': blocked '+route)
# This iteration authorizes content changes on five commercial pages only.
# All other main content, including complete product pages and guides, stays exact.
content_routes={'/','/urunler/','/oto-yikama-pervanesi/','/boom-pervane/','/self-servis-oto-yikama-pervanesi/'}
for route in routes:
 if route in content_routes:continue
 path='index.html' if route=='/' else route.lstrip('/')+'index.html'
 baseline=subprocess.check_output(['git','show','0f6b40b82df98e81a9c8d60a5e961f1790d2b38b:'+path],cwd=ROOT,text=True)
 check(str(BeautifulSoup(baseline,'html.parser').main)==str(cache[route].main),route+': approved main content changed')
home=cache['/']
baseline_home=BeautifulSoup(subprocess.check_output(['git','show','0f6b40b82df98e81a9c8d60a5e961f1790d2b38b:index.html'],cwd=ROOT,text=True),'html.parser')
check(str(home.select_one('.hero'))==str(baseline_home.select_one('.hero')),'approved hero changed')
facts=home.select('.home-facts>li')
check(len(facts)==3,'expected three illustrated feature explanations')
check([f.h2.get_text() for f in facts]==['360° hareket','İhtiyacınıza göre','Yerli üretim'],'feature headings changed')
for f in facts:
 check(bool(f.select_one('.fact-copy p')) and bool(f.select_one('.fact-copy a[href]')),'feature description or destination missing')
 icon=f.select_one('.fact-icon svg')
 check(bool(icon) and icon.get('aria-hidden')=='true' and icon.get('focusable')=='false','feature icon accessibility')
check((ROOT/'assets/licenses/lucide.txt').is_file(),'icon license missing')
for route,count in [('/',3),('/urunler/',6),('/boom-pervane/',3)]:
 check(len(cache[route].select('.card-description'))==count,route+': detailed card descriptions missing')
 check(len(cache[route].select('.card-preparation'))==count,route+': product selection guidance missing')
check(len({n.get_text(' ',strip=True) for n in cache['/urunler/'].select('.card-description')})==6,'product card explanations must be specific')
check(len(home.select('.faq details'))==4,'home buying questions missing')
check(len(cache['/oto-yikama-pervanesi/'].select('.guide-grid .guide-card'))==3,'selection scenarios missing')
for paragraph in home.select('.fact-copy p,.faq details p')+cache['/urunler/'].select('.card-description'):
 check(paragraph.get_text(' ',strip=True) in full,'new visible buying guidance missing from LLM export')
check((ROOT/'assets/js/script.js').stat().st_size<6000,'JS budget')
report={'html_pages':len(cache),'indexable_routes':len(routes),'checked_local_references':checked,'json_ld_blocks':schemas,'protected_products':len(DATA['products']),'protected_product_images':sum(len(p['images']) for p in DATA['products']),'duplicate_titles':len(titles)-len(set(titles)),'duplicate_descriptions':len(descriptions)-len(set(descriptions)),'css_bytes':(ROOT/'assets/css/style.css').stat().st_size,'js_bytes':(ROOT/'assets/js/script.js').stat().st_size,'errors':errors}
print(json.dumps(report,ensure_ascii=False,indent=2))
(ROOT/'_site_src/verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
raise SystemExit(bool(errors))
