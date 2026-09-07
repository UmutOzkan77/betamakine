# Beta Makine — ferah ürün deneyimi

## Kabul ölçütleri
- Dar font yok: yerel Manrope başlıklar (500–600), DM Sans gövde (400–600); Türkçe harfler dahil.
- Telefon şeridi yerine tek temiz header; mobilde erişilebilir, klavyeyle kapanan menü.
- Hero yalnızca gerçek ürün fotoğrafını kullanır; uydurma tesis / otomatik yıkama makinesi göstermez.
- 6 ürün açıklaması, 16 fotoğraf, mevcut URL ve SEO verileri korunur.
- 320, 390, 768, 1280 px kontrolleri; yatay sayfa taşması, okunamayan metin veya JS bağımlı içerik yok.

## Tasarım kararı
Konu: Bursa merkezli oto yıkama pervanesi üreticisi. Hedef: istasyon sahiplerinin modeli anlaması ve doğrudan teklif istemesi.
Palet: porselen #F6F8FB, beyaz #FFFFFF, gece mavisi #102B43, kobalt #225CE7, gök mavisi #ABD6FF, ikincil metin #526477.
Başlıklar normal genişlikte, 1.15–1.25 satır yüksekliğinde; gövde 17 px / 1.75. Kartlarda ve teknik tablolarda en az 15 px.
İmza: gerçek döner bağlantının yakın planı + aynı ürünün bütün görünümü. Katalog, ürünün ölçeğini ve detayını birlikte anlatır.

İlk fikir olan sıradan iki eşit sütunlu hero elendi. Koyu bir fotoğraf sahnesi, sakin beyaz navigasyon ve aşağıda açık ürün kataloğu ile kontrast kuruldu. Genel cam efekti, sahte referans sayaçları ve dekoratif blueprint verileri kullanılmaz.

## Canlı plan
- [x] Kaynak, görseller, kullanıcı itirazı ve frontend becerilerini incele.
- [x] Tasarım yönü ve performans sınırlarını belirle.
- [x] Ana sayfa, fontlar ve mobil menüyü uygula; tarayıcıda değerlendir.
- [x] Ortak tasarımı ürün, rehber, bilgi ve iletişim sayfalarına taşı.
- [x] Ürün/SEO regresyonları ve responsive/klavye testlerini çalıştır.
- [ ] PR üzerinden yayınla ve canlı sayfaları doğrula.

## Araştırma ve sınırlar
Lazyweb endüstriyel üretici referansları; UI/UX Pro Max okunabilirlik ve etkileşim kontrolleri; Gemini salt plan eleştirisi kullanıldı. Genel Liquid Glass / ağır motion önerileri işin ürün fotoğrafı, okunabilirlik ve hız gereksinimine uymadığı için uygulanmadı. Preloader, scroll hijacking, animasyon kütüphanesi ve özel imleç yok.
SEO denetimi: mevcut benzersiz title/description/canonical, 32 URL sitemap ve yapılandırılmış veri korunur. Anasayfanın ana başlığında ürün ailesi açıkça adlandırılır. Sıralama garantisi veya ölçülmemiş hız skoru verilmez.

## Görsel araştırma ve uygulama

[Lazyweb araştırması](https://www.lazyweb.com/agentic-search/c54c620c-6c62-42f5-8b43-9bf0cb1e1a42): Velo3D'nin fotoğraf odaklı endüstriyel hiyerarşisi referans alındı; tasarımı kopyalanmadı.
Imagegen, gerçek Tekli Z fotoğrafları referansıyla yaratıcı bir masaüstü taslağı üretti. Taslak yalnızca yön belirlemek için kullanıldı. Canlı sayfalarda üretilmiş ürün fotoğrafı, hayali teknik değer veya değiştirilmiş logo yok.
Frontend-design ve premium-frontend-ui; normal genişlikte tipografi, sakin navigasyon ve belirgin ürün fotoğrafı için uygulandı. UI/UX Pro Max rehberindeki motion-reduce ve z-index ilkeleri saf CSS ile karşılandı; mevcut statik siteye Tailwind/React eklenmedi.

## Doğrulama — 8 Eylül 2026

- 32 indekslenebilir URL'nin tamamı gerçek tarayıcıda 320 ve 1280 px genişliklerde tarandı: sayfa taşması, bozuk yüklenmiş görsel veya H1 sayısı hatası yok.
- Ana sayfa 390, 620, 700, 701, 768, 900, 901 ve 1440 px genişliklerde ayrıca kontrol edildi. 701 px'te eylem grubu kutusu ile fotoğraf etiketi kesişse de gerçek iki bağlantı kesişmiyor; bağlantılar tek tek ölçüldü.
- Mobil menü: açılış odağı Kapat, Shift+Tab ile son bağlantıya ve Tab ile Kapat'a dönüş; Escape, sayfa bağlantısı ve masaüstüne genişleme sonrası kapanma/scroll kilidinin kalkması doğrulandı.
- Galeri ikinci fotoğrafı aynı sayfada gösteriyor. SSS açılıyor. Ürün teklif kutusu static akışta; özellikleri kapatan sabit panel yok.
- Scriptsiz ana sayfa ve ürün fixture'larında menü, açıklama ve fotoğraf bağlantıları erişilebilir.
- Manrope ve DM Sans Türkçe karakterleriyle yüklendi. 4 yerel font toplam 94.988 bayt; OFL lisansları depoda.
- CSS 29.655 bayt, JavaScript 3.855 bayt. Yerel font tanımları ve yeni menü tasarımı nedeniyle sıkıştırılmamış CSS sınırı 25 KB'den 32 KB'ye güncellendi; JavaScript sınırı 6 KB olarak korundu. Animasyon kütüphanesi yok.
- Statik denetim: 35 HTML, 32 indekslenebilir URL, 1.710 yerel referans, 33 JSON-LD bloğu. 6 ürün açıklaması ve 16 görsel baseline ile aynı; tekrarlayan title/description yok. Tüm kontroller geçti.
- Gerçek Google sıralaması, Search Console performans değişimi veya saha Core Web Vitals sonuçları bu yayın öncesi testlerden çıkarılamaz.
