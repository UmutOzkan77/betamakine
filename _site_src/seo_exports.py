"""Generate discovery files from the same published pages, never a second truth."""
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import xml.etree.ElementTree as ET

def export(root, domain, date, routes, products, articles):
 docs={r:BeautifulSoup((root/(r.strip('/')+'/index.html' if r!='/' else 'index.html')).read_text(),'html.parser') for r in routes}
 summaries={r:s.select_one('meta[name="description"]')['content'] for r,s in docs.items()}
 titles={r:s.title.get_text().split(' | ')[0] for r,s in docs.items()}
 def entry(r):return f'- [{titles[r]}]({domain+r}): {summaries[r]}'
 main=['/','/urunler/','/oto-yikama-pervanesi/','/boom-pervane/','/self-servis-oto-yikama-pervanesi/','/blog/']
 selected=['oto-yikama-pervanesi-nedir','oto-yikama-pervanesi-boom-nedir','oto-yikama-pervanesi-fiyatlari','oto-yikama-boom-pervane-olculeri-yerlesim-plani','oto-yikama-pervanesi-montaj-rehberi','oto-yikama-pervanesi-basinc-hortum-uyumu','oto-yikama-pervanesi-bakimi','doner-rekor-arizasi-nasil-anlasilir']
 header='# Beta Makine\n\n> Bursa Nilüfer’de oto yıkama pervanesi, tekli Z ve çiftli boom, teleskopik tır pervanesi ve döner rekor üreten işletmenin ürün ve teknik bilgi kaynakları.\n\n'
 facts='Firma: Şener Çubukçu BE_TA Makine. Adres: Fethiye Mahallesi Doğru Sokak No:9, Nilüfer / Bursa, Türkiye. Telefon: +90 536 461 53 30. Dil: Türkçe.\n\nKatalog altı ürünü kapsar. Fiyat, stok, teslim süresi ve garanti koşulları ürüne özel yazılı teklifle netleşir. Rehberler genel ön bilgi verir; modele ait kullanım ve servis talimatı önceliklidir.\n\n'
 text=header+facts+'## Ürün seçimi ve katalog\n\n'+'\n'.join(entry(r) for r in main)+'\n\n## Ürünler\n\n'+'\n'.join(entry(p['route']) for p in products)+'\n\n## Teknik rehberler\n\n'+'\n'.join(entry('/blog/'+slug+'/') for slug in selected)+'\n\n## Firma ve iletişim\n\n'+'\n'.join(entry(r) for r in ['/about/','/contact/'])+'\n\n## Optional\n\n- [Ayrıntılı içerik dizini]('+domain+'/llms-full.txt): Otuz iki kanonik sayfanın açıklamaları, ürün özellikleri ve rehberlerin kısa cevapları; yayınlanan siteyle birlikte oluşturulur.\n'
 (root/'llms.txt').write_text(text)
 full=header+facts+'Bu dosya yayınlanan sayfalardan derlenir. Ayrıntılar ve güncel teknik kapsam için her bölümdeki kanonik sayfa esas alınır.\n\n'
 pmap={p['route']:p for p in products}; amap={a['route']:a for a in articles}
 for r in routes:
  full+='## '+titles[r]+'\n\n'+entry(r)+'\n\n'
  if r in pmap:
   full+='\n'.join('- '+k+': '+v for k,v in pmap[r]['specs'])+'\n\n'
  if r in amap:
   full+='Kısa cevap:\n'+'\n'.join('- '+x for x in amap[r]['takeaways'])+'\n\n'
   full+='İlgili ürün: '+domain+amap[r]['product']['route']+'\n\n'
  headings=[h.get_text(' ',strip=True) for h in docs[r].select('main h2') if h.get_text(' ',strip=True)]
  full+='Sayfadaki başlıklar: '+'; '.join(headings)+'\n\n'
 (root/'llms-full.txt').write_text(full.rstrip()+'\n')
 ns='http://www.sitemaps.org/schemas/sitemap/0.9'; ins='http://www.google.com/schemas/sitemap-image/1.1'
 ET.register_namespace('',ns); ET.register_namespace('image',ins)
 sitemap=ET.Element('{'+ns+'}urlset')
 for r in sorted(routes):
  node=ET.SubElement(sitemap,'{'+ns+'}url')
  ET.SubElement(node,'{'+ns+'}loc').text=domain+r
  ET.SubElement(node,'{'+ns+'}lastmod').text=date
  for src in dict.fromkeys(i['src'] for i in docs[r].select('main img[src]')):
   image=ET.SubElement(node,'{'+ins+'}image')
   ET.SubElement(image,'{'+ins+'}loc').text=urljoin(domain,src)
 ET.indent(sitemap,space='  ')
 ET.ElementTree(sitemap).write(root/'sitemap.xml',encoding='utf-8',xml_declaration=True)
