# Beta Makine site kaynağı

Statik HTML: ziyaretçi ve arama motoru için JavaScript gerektirmez. GitHub Pages kökteki oluşturulmuş HTML dosyalarını yayınlar.

## Yenileme planı — 8 Eylül 2026

- [x] 34 URL, 6 ürün ve 18 makalenin içerik/arama niyeti incelemesi.
- [x] Katalog, model seçimi, kurulum planı ve bilgi merkezi görevlerini ayırma.
- [x] Ortak tasarım ve statik şablonları uygulama.
- [x] Ürün metni, görsel ve ölçü bütünlüğü testi.
- [x] Tüm URL / metadata / schema / bağlantı testleri.
- [x] Masaüstü ve mobil tarayıcı kontrolleri.
- [ ] Yayın ve canlı kontrol.

Tasarım: serin beyaz #F5F7F8, çelik #E4EAEE, mürekkep #142D3D, endüstriyel mavi #1455CC, ikincil metin #50616D. Büyük ama kontrollü dar başlıklar (Arial Narrow / sistem sans), okunaklı sistem gövde fontu, teknik ölçülerde monospace. İmza: gerçek pervane fotoğrafı ve ürünün gerçek ölçüsünü gösteren katalog paftası. Hareketli kapak, parlama, popup ve anahtar kelime kutuları yok.

## Komutlar

`python3 _site_src/build.py` — kalıcı içerik verisinden tüm sayfaları üretir.

`python3 _site_src/verify.py` — ürün, bağlantı, SEO ve çıktı regresyonları.

İlk veri aktarımı `_site_src/migrate.py` ile sabit `4be92a2` commit'inden yapılmıştır; bu komut yeni içerik düzenlemelerini üzerine yazabileceği için normal build akışında **çalıştırılmaz**. Ürünlerin orijinal açıklama ve görsel listesi `content.json` içinde korunur. Tasarım değişiklikleri ürün verisinden ayrıdır.

Yerel geliştirme bağımlılığı BeautifulSoup4'tür; canlı sitede Python veya ek çalışma zamanı yoktur.

## SEO sınırları

Sıralama garantisi yoktur. JSON-LD sözdizimi testi, Google zengin sonuç uygunluğu değildir. Güncel fiyat ve gerçek değerlendirme verisi olmadan Offer/Review üretilmez. GitHub Pages `.htaccess` okumaz; eski URL'ler anlık HTML yönlendirmesi kullanır, HTTP 301 olarak raporlanmaz. Alan verisi olmayan hız metrikleri veya güncel Search Console sonuçları uydurulmaz.
