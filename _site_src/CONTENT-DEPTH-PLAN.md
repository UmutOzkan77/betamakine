# İkonlar ve açıklama derinliği — 8 Eylül 2026

Amaç: kullanıcının gösterdiği üçlü özellik alanını ikon ve gerçek açıklamalarla tamamlamak; beğenilen tasarımı korumak.

- [x] Mevcut kaynak, ürün verisi, önceki sürüm ve ekran görüntüsü incelendi.
- [x] SEO içerik ilkesi doğrulandı; kelime sayısı hedefi değil, satın alma soruları esas alındı.
- [x] Üç özellik ikonu ve açıklamalar; ana sayfa, katalog ve üç seçim/kurulum sayfasında konuya özgü ek bilgiler.
- [x] Ürün sayfalarının ana içeriklerini, orijinal fotoğrafları ve diğer sayfaları koruyan regresyon testleri.
- [x] Masaüstü, tablet ve mobil görsel kontrol; bağlantı ve metin kontrolleri.
- [ ] PR üzerinden yayın ve canlı doğrulama.

Tasarım: mevcut Manrope başlık / DM Sans gövde; #102B43 koyu mavi, #225CE7 vurgu, #F6F8FB açık zemin, #DBE3EC ayırıcı korunur. Üç sütunda ikon → başlık → açıklama → ilgili bağlantı; mobilde ikon solda, metin sağda tek sütun. Hero ve navigasyon değişmez. İkonlar dekoratiftir; anlam başlıklarda ve gerçek HTML metninde bulunur.

İkon kaynağı: mevcut sitede yalnızca WhatsApp SVG'si vardı. Lucide `rotate-cw`, `sliders-horizontal`, `factory` statik SVG'leri, ISC lisansıyla yeniden kullanılır; yeni JS paketi veya animasyon eklenmez. Kaynak: https://github.com/lucide-icons/lucide/tree/main/icons (8 Eylül 2026).

Lazyweb dar kapsamlı endüstriyel özellik alanı araması zayıf eşleşme döndürdü; yeni tasarım yönü alınmadı. Kullanıcının ekranı ve mevcut bileşenler esas alındı.

SEO dayanağı: https://developers.google.com/search/docs/fundamentals/creating-helpful-content — açıklayıcı, insan odaklı içerik; tercih edilen bir kelime sayısı veya sıralama garantisi yoktur.

## Uygulama ve doğrulama

- 3 dekoratif ikon, üç açıklayıcı paragraf ve ilgili konu sayfasına üç bağlantı eklendi.
- Altı katalog ürünü için kullanım açıklaması ve seçim öncesi kontrol bilgisi hazırlandı; ana sayfa ve boom listesinde de uygun kartlar kullanılır. Asıl ürün sayfaları değişmedi.
- Ana sayfada dört gerçek satın alma sorusu yanıtlandı. Model seçiminde üç senaryo, kurulum sayfasında beş hazırlık adımı genişletildi. Yeni sayfa/anahtar kelime sayfası üretilmedi.
- Yeni görünür açıklamalar ve soru-cevaplar `llms-full.txt` dosyasına HTML'den aktarılır; eşlik regresyonla kontrol edilir.
- 35 HTML, 32 kanonik rota, 1.939 yerel referans ve 33 JSON-LD bloğu doğrulandı. Altı ürün açıklaması ve 16 fotoğraf korundu. Beş kapsam içi sayfa dışındaki 27 sayfanın ana içeriği, önceki yayınla tam aynı; ana sayfa hero'su da aynı.
- Ana sayfa özellikleri 1280, 768, 390 ve 320 px ekranlarda görsel olarak incelendi. Tablet için özellikler yatay ikonlu tek sütuna, açıklamalı katalog kartları iki sütuna uyarlandı. Mobil kartlar tek sütun.
- Katalog masaüstünde; model seçimi, boom ve self servis açıklamaları mobilde incelendi. Ana sayfa ilk kısa cevabı 320 px görünümde açıldı; çalışma mantığı bağlantısı doğru boom sayfasına gitti.
- CSS 31.315 bayt; 32 KB sınırı altında. Yeni JavaScript veya font/görsel bağımlılığı eklenmedi. JS 3.855 bayt olarak kaldı.
- Bu çalışma yayın sonrası sıralama, trafik artışı veya Core Web Vitals sonucu ölçmez.
