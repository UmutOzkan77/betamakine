"""One-time, reproducible content extraction from the pre-redesign Git snapshot."""
from pathlib import Path
import json, subprocess
from urllib.parse import urljoin, urlsplit
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
BASE = '4be92a288085d96fcd18a9967fcd5a20e3d73adb'
def original(path):
    return subprocess.check_output(['git', 'show', f'{BASE}:{path}'], cwd=ROOT, text=True)

data = {'baseline': BASE, 'products': [], 'articles': [], 'inventory': []}
paths = subprocess.check_output(['git', 'ls-tree', '-r', '--name-only', BASE], cwd=ROOT, text=True).splitlines()
for path in sorted(p for p in paths if p.endswith('index.html')):
    s = BeautifulSoup(original(path), 'html.parser')
    route = '/' + path.removesuffix('index.html')
    title = s.title.get_text(strip=True)
    description = s.select_one('meta[name="description"]')['content']
    main = s.select_one('main')
    data['inventory'].append({'route': route, 'title': title, 'headings': [h.get_text(' ',strip=True) for h in main.select('h1,h2,h3')]})
    if path.startswith('urunler/') and path != 'urunler/index.html':
        images = list(dict.fromkeys(urlsplit(urljoin(route, i['src'])).path for i in s.select('.product-detail-left img')))
        faq = [{'q': d.summary.get_text(' ',strip=True), 'a': d.p.get_text(' ',strip=True)} for d in s.select('details') if d.summary and d.p]
        data['products'].append({'route': route, 'title':title, 'description':description, 'name':s.h1.get_text(' ',strip=True), 'body':str(s.select_one('.product-description')), 'images':images, 'faq':faq})
    elif path.startswith('blog/') and path != 'blog/index.html':
        m=s.select_one('main .blog-container')
        name=m.h1.get_text(' ',strip=True)
        for n in m.select('h1,.post-updated'): n.decompose()
        for a in m.select('a[href]'):
            if not a['href'].startswith(('https:','http:','tel:','mailto:')): a['href']=urljoin(route,a['href'])
        data['articles'].append({'route':route, 'title':title, 'name':name, 'description':description, 'body':m.decode_contents()})
(ROOT/'_site_src/content.json').write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n')
print(f"Extracted {len(data['inventory'])} routes, {len(data['products'])} products, {len(data['articles'])} articles")
