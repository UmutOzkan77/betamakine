# Beta Makine — SEO / GEO ve görselli bilgi merkezi

İnceleme: 8 Eylül 2026. Bu rapor bir sıralama skoru değil; gözlem, uygulama ve doğrulama kaydıdır.

## Verinin söylediği

Kullanıcının Search Console dışa aktarımı 6 Haziran–5 Eylül 2026 arasındaki 92 günü kapsıyor: 21 tıklama, 337 gösterim. `oto yıkama pervanesi` satırında 0 tıklama, 2 gösterim, 22,5 ortalama konum var. Bu, sorguda düşük görünürlüğü gösteriyor; sadece iki gösterimden kalıcı sıralama veya Google cezası sonucu çıkarılamaz.

İndeks raporunda 5 yönlendirmeli sayfa, 1 doğru canonical etiketli alternatif ve 3 “tarandı, şu anda dizine eklenmiş değil” kaydı var. İlk iki sınıf tek başına hata değildir. Dosyalar üç indekslenmeyen URL'nin adını vermiyor; güncel URL denetimi gerekli.

Kaynaklar: kullanıcının `Downloads/betamakine/Grafik.csv`, `Sorgular.csv`, `Filtreler.csv`, `Sayfa sayısı.csv`; `betamakine-2/Önemli sorunlar.csv` ve `Meta Veri.csv` dosyaları. Sayfa satırlarının toplamı mülk günlük toplamının yerine kullanılmadı.

Bağlı Search Console aracıyla mülkler listelendi; Beta Makine erişilebilir mülkler arasında değil. Bu nedenle güncel indeks durumu, Google'ın seçtiği canonical, son tarama zamanı veya yeni tasarımın trafik etkisi doğrulanmış sayılmıyor. Kullanıcıdan doğru hesabı bağlaması istendi.

## Rakiplerden gözlemler

| Kaynak | Görülen güçlü yan | Beta Makine için uygulama / sınır |
| --- | --- | --- |
| [Bakaş çiftli ürün](https://bakas.com.tr/krom-self-servis-oto-yikama-pervanesi-boom-jet-kopuk-ciftli) | Ürün adında model ve aranan terimler; fiyat, stok, yorum ve satın alma alanları | Gerçek model bilgileri ve teklif yolu korunuyor. Rakibin fiyatı, garanti vaadi veya yorumları kopyalanmıyor. |
| [Naturel çiftli ürün](https://www.naturelmakina.com/self-servis-oto-yikama-pervanesi-boom-ciftli-pervane-krom-nt416010) | Ürün fotoğrafı, ürün kodu, fiyat, teslimat bilgisi ve WhatsApp siparişi bir arada | Fotoğrafın bilgiyle aynı yerde olması rehberlere taşındı. Kesin ticari bilgiler için Beta Makine'nin resmi listesi gerekiyor. |
| [GND boom ürün](https://www.gndyikamasistemleri.com/oto-yikama-pervanesi-boom-tekli-pergel_101_u.html) | Arama terimiyle uyumlu H1; doğrudan telefon/WhatsApp ve teslimat/ödeme açıklamaları | Açıklayıcı WhatsApp düğmesi, ürünlere bağlanan kısa cevaplar ve karşılaştırma bağlantıları güçlendirildi. |
| [Rotowash kategori](https://www.rotowash.com.tr/urun-kategori/self-servis-parali-jetonlu-makinalar/self-servis-hortum-aski-pervaneleri/) ve [170152 ürünü](https://www.rotowash.com.tr/urun/170152-oto-yikama-pervanesi-boom-ciftli-170152/) | Model ailesi kategori içinde düzenli; ürün kodu ve ilgili modellerle keşif | Bizde ürün/kategori/rehber ayrımı korunuyor; 18 rehber üç konu grubunda fotoğraflı listeleniyor. Ürün URL'si canlı metin çekiminde ağırlıkla navigasyon döndürdü; ürün ayrıntıları arama motorunun önbellekli sonucundan görüldü, canlı schema iddiası yapılmadı. |

Bu özellikler faydalı kullanıcı deneyimi gözlemleridir; hangi rakibin hangi tarihte ilk sırada olduğunu veya tek bir özelliğin sıralamayı belirlediğini kanıtlamaz. Rakip şemalarının yokluğu, salt metin çekimine bakılarak iddia edilmedi. İlk denenmiş Bakaş blog/GND kısa URL'leri erişilemedi; yukarıdaki doğrulanmış ürün yolları kullanıldı.

## Uygulananlar

1. **Görselli bilgi merkezi:** 18 kart, üç konu grubu ve bir başlangıç rehberi. Mevcut ana sayfa ve ürünlerin ana içerikleri değişmedi.
2. **18 görselli makale:** her rehbere ilgili gerçek ürün fotoğrafı, üç maddelik kısa cevap, açıklamalı ara görsel, okuma süresi ve üretici bağlantısı eklendi. Uzun yazıda 17–18 px gövde ve geniş satır aralığı korunuyor.
3. **İki özgün editoryal illüstrasyon:** bakım kontrolü ve kurulum hazırlığı. Görseller temsili olarak açıkça etiketlendi; ürün galerisine konmadı. WebP toplam 121.156 bayt, sayfa altında lazy-load.
4. **Makale keşfi:** her makalenin gerçek kapak fotoğrafı `BlogPosting` / `TechArticle` ve Open Graph içinde eşleşiyor. Şemadaki abstract görünür kısa cevapla aynı. Yayın tarihi uydurulmadı; gerçek içerik düzenleme tarihi kullanıldı.
5. **Sayfa türleri:** bilgi merkezi `CollectionPage` + 18 URL'lik `ItemList`; hakkında ve iletişim sayfaları doğru sayfa türleriyle tanımlandı. Yerel işletme adı, adres, telefon ve sitede zaten yer alan saatler yapılandırıldı. Koordinat, müşteri sayısı veya uzmanlık belgesi uydurulmadı.
6. **Görsel site haritası:** mevcut 32 kanonik URL'ye sayfalarda gerçekten görünen görseller eklendi. Harita yine aynı `sitemap.xml` adresinde; mevcut robots referansı geçerli.
7. **LLM kaynakları:** `llms.txt` 23 açıklamalı bağlantıyla; `llms-full.txt` 32 sayfanın açıklama, ürün özelliği ve kısa cevaplarıyla yeniden üretildi. İçerikler yayınlanan HTML ve aynı ürün kaynağından derleniyor. Yeni bir değişiklikte ayrıca elle güncellemek gerekmiyor. Sayfalarda `rel="describedby"` keşif bağlantısı var.
8. **WhatsApp:** görünür metin “Bize WhatsApp’tan ulaşın”; canlı yeşil zemin üzerinde koyu metin, mevcut resmi numara. Mesaj kendiliğinden gönderilmez.
9. **Regresyonlar:** ürün açıklama/görsel korumasına ek olarak makale fotoğrafı, kısa cevap/şema eşliği, görsel site haritası, LLM bağlantıları, bot erişimi ve beğenilen ana içeriklerin değişmemesi test ediliyor.

## Gerçek sınırlar ve sonraki öncelikler

| Öncelik | İş | Neden henüz sonuç sayılmıyor? |
| --- | --- | --- |
| P1 | Search Console'da üç indekslenmeyen URL'yi ayrı denetlemek | Mülk bağlı hesapta yok; CSV yalnızca sayıyı içeriyor. |
| P1 | Yeni sitemap ve önemli URL'lerin Google tarafından yeniden işlenmesini doğrulamak | Dosyayı yayınlamak, Google'ın indekslediğinin kanıtı değil. |
| P1 | Resmi ürün fiyatı, stok, sevkiyat ve garanti kapsamını sağlamak | Rakiplerin ticari açıklık avantajı teknik meta etiketle kapatılamaz. Fiyat/yorum olmadan Product verisinin her zengin sonuca uygunluğu iddia edilmez. |
| P2 | Gerçek kurulum fotoğrafları, izinli müşteri örnekleri ve üretici teknik belgeleri | Bunlar özgün deneyim ve otorite sağlar; yapay görsel bunların yerine geçmez. |
| P2 | Google Business Profile ve marka bilgilerinin tutarlılığını doğrulamak | Profil yönetimi/hesabı bu turda doğrulanmadı; kullanıcı onayı olmadan dış platformda içerik yayınlanmadı. |
| P2 | En az 28 günlük aralıkta sorgu bazında gösterim, tıklama ve iletişim dönüşümlerini karşılaştırmak | Yeni yayın için yeterli süre/ölçüm henüz yok. Aynı gün artış iddiası yapılmaz. |

## Güncel resmi dayanaklar

- [Google AI özellikleri](https://developers.google.com/search/docs/appearance/ai-features): erişilebilir metin, iç bağlantılar, yararlı görseller ve görünür içerikle uyumlu şema temel. Özel AI dosyası veya özel schema şart değil.
- [Google makale şeması](https://developers.google.com/search/docs/appearance/structured-data/article): makaleyi tanımlayan başlık, yazar ve ilgili görsel bilgisi. Zengin sonuç gösterimi garanti değildir.
- [Google görsel sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps): mevcut URL haritasına görsel konumları eklenebilir.
- [llms.txt v2 önerisi](https://llmstxt.org/): başlık, kısa açıklama ve açıklamalı kaynak listeleri; `rel="describedby"` ile keşif. Bir erişim kontrolü ya da sıralama garantisi değil. Bu sürüm statik HTML kaynaklarına bağlanır; ayrı Markdown sayfa kopyaları eklenmedi.

SEO Optimizer'daki eski FID ölçütü ve sabit kelime/anahtar kelime yoğunluğu reçeteleri hedef yapılmadı. Güncel INP/CLS/LCP yaklaşımı ve okunabilir, konuya özgü içerik esas alındı. Ölçülmemiş Core Web Vitals veya “100/100 GEO” skoru yazılmadı.

## Yayın öncesi doğrulama

- Statik testler geçti: 35 HTML, 32 indekslenebilir URL, 1.928 yerel referans ve 33 JSON-LD bloğu. 6 ürün açıklaması, 16 ürün görseli ve blog dışındaki ana içerikler önceki onaylanmış sürümle aynı.
- 19 bilgi merkezi sayfası 320, 390 ve 1280 px görünüm kontrollerinden geçti; 768 px tablet görünümü ayrıca incelendi. Ölçümde gerçek `innerWidth` doğrulandı. Yatay taşma veya bozuk yüklenmiş görsel bulunmadı.
- Makale içindekiler bağlantısı doğru başlığa götürüyor. Görsel açıklaması, kısa cevaplar ve üretici bağlantıları gerçek tarayıcıda incelendi.
- HTTPS olmayan www ve HTTPS www-olmayan kök istekleri doğru kanonik adrese 301 yönleniyor (8 Eylül canlı HTTP başlıkları).
- Ek bilgi merkezi CSS'i yalnızca ilgili 19 sayfada yüklenir: 4.843 bayt. Ana JS'e ekleme yapılmadı. Yeni görseller toplam 121 KB.
- [Görsel düzen araştırması](https://www.lazyweb.com/agentic-search/17a6dce6-55b5-461e-8389-61c8c8b3117b): öne çıkan başlangıç rehberi ve konu bazlı görselli kart düzeni. Beğenilen site kimliği korunarak uyarlandı.
- Imagegen built-in modu ile üretilen iki varlığın tam promptları ve dosyaları `IMAGEGEN-GUIDE-PROMPTS.md` içinde kaydedildi.
