"""Produce ignored local fixtures to inspect the no-JavaScript fallback in a browser."""
from pathlib import Path
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1]
out=ROOT/'_site_src/fixtures'
out.mkdir(exist_ok=True)
for name,path in [('home','index.html'),('product','urunler/tekli-z-oto-yikama-pervanesi/index.html')]:
 s=BeautifulSoup((ROOT/path).read_text(),'html.parser')
 for script in s.select('script'):script.decompose()
 (out/(name+'.html')).write_text(str(s))
