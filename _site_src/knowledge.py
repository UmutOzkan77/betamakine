"""Visual and factual guide metadata; original product source remains immutable."""
from html import escape
from urllib.parse import quote
from bs4 import BeautifulSoup

GUIDES = {
 'doner-rekor-arizasi-nasil-anlasilir': (3, 1, ['Damlama tek başına parçanın kesin arızalı olduğunu göstermez.', 'Ses, kaçak ve dönüş sertliğini ayrı ayrı kaydedin.', 'Basınçlı bağlantıya müdahale etmeden teknik destek alın.']),
 'en-iyi-oto-yikama-pervanesi-nasil-secilir': (0, 0, ['Önce araç tipini ve kabin ölçülerini belirleyin.', 'Tekli veya çiftli seçiminde hortum hattı sayısını esas alın.', 'Montaj ve bağlantı uyumunu teklif öncesinde doğrulayın.']),
 'oto-yikama-boom-pervane-olculeri-yerlesim-plani': (2, 0, ['Kol uzunluğu, kullanılabilir dönüş alanıyla aynı değildir.', 'Kabin eni, boyu ve montaj yüksekliğini birlikte ölçün.', 'Hortum erişimini ve çevredeki engelleri hesaba katın.']),
 'oto-yikama-pervanesi-bakimi': (0, 1, ['Kontrol sıklığını kullanım koşullarına göre planlayın.', 'Kaçak, çatlak veya takılmada kullanımı durdurun.', 'Yağlama ve değişim için modele ait talimatı izleyin.']),
 'oto-yikama-pervanesi-balans-ayari': (1, 1, ['Hortumla yönlenen kolu motorlu bir fan gibi değerlendirmeyin.', 'Montaj hizası, hortum yükü ve mekanik boşluğu ayırın.', 'Kola karşı ağırlık eklemeyin veya kolu eğmeyin.']),
 'oto-yikama-pervanesi-basinc-hortum-uyumu': (5, 0, ['Pompa, hortum, rekor ve tabancayı birlikte değerlendirin.', 'Diş ölçüsü kadar bağlantı standardı ve çalışma değerleri de önemlidir.', 'Uyumluluğu yalnızca dış görünüşten çıkarmayın.']),
 'oto-yikama-pervanesi-boom-nedir': (1, 0, ['Tekli boom tek hortum hattını taşır.', 'Çiftli boom aynı kabinde köpük ve su gibi iki hattı yönlendirir.', 'Daha yoğun kullanım tek başına çiftli model gerekçesi değildir.']),
 'oto-yikama-pervanesi-donmuyor': (0, 1, ['Takılan pervaneyi zorlamayın; kullanımı durdurun.', 'Hortum rotası, dış temas ve bağlantı belirtilerini ayırın.', 'Söküm veya ayar öncesi teknik servis değerlendirmesi alın.']),
 'oto-yikama-pervanesi-fiyatlari': (1, 2, ['Teklifleri aynı model, adet ve parça kapsamında karşılaştırın.', 'Vergi, sevkiyat ve dahil olan rekorları ayrı ayrı netleştirin.', 'Güncel fiyat ve teslim süresini yazılı teklifle doğrulayın.']),
 'oto-yikama-pervanesi-kisin-donma-sorunu': (4, 0, ['Donmuş hatta basınç vermeyin ve pervaneyi zorlamayın.', 'Kontrolsüz ısı veya kimyasal uygulamayın.', 'Yeniden çalıştırmadan önce hasar ve hat açıklığını doğrulatın.']),
 'oto-yikama-pervanesi-mil-boslugu-olcumu': (0, 1, ['Elle hissedilen oynama hassas ölçüm değildir.', 'Kabul sınırı modele ait üretici toleransıdır.', 'Ölçüm ve bakım kararını yetkin teknik personel vermelidir.']),
 'oto-yikama-pervanesi-montaj-rehberi': (0, 1, ['Taşıyıcı yüzey, kabin ve montaj ölçülerini hazırlayın.', 'Kolun tam hareketinde temas ve hortum gerginliğini değerlendirin.', 'Ankraj ve bağlantı değerlerini projeye özel doğrulatın.']),
 'oto-yikama-pervanesi-nedir': (0, 0, ['Pervane, hortumu yukarıdan taşıyan döner kol sistemidir.', 'Motorlu fan değildir; hortumun yönlendirilmesiyle hareket eder.', 'Tekli, çiftli ve teleskopik modeller farklı ihtiyaçlara karşılık gelir.']),
 'oto-yikama-pervanesi-rulman-arizasi': (1, 1, ['Sert dönüş, ses ve boşluk birlikte değerlendirilir.', 'Benzer belirtiler rekor veya montaj bağlantısından da gelebilir.', 'Belirtiyi kesin teşhis yerine servis için gözlem olarak kaydedin.']),
 'oto-yikama-pervanesi-ses-yapiyor': (3, 2, ['Gıcırtı, vuruntu ve basınçla artan sesi ayırt edin.', 'Sesin yerini ve oluştuğu konumu güvenli biçimde kaydedin.', 'Kaçak veya takılma eşlik ediyorsa kullanımı durdurun.']),
 'oto-yikama-pervanesi-yaglama-noktalari': (3, 0, ['Her kapalı rulman veya döner rekor yeniden yağlanmaz.', 'Gres türü, miktarı ve noktasını üretici talimatından doğrulayın.', 'Sesi veya boşluğu gelişigüzel yağlayarak gidermeye çalışmayın.']),
 'self-servis-oto-yikama-istasyonu-ekipman-listesi': (1, 0, ['Kabin, pervane ve hortum rotasını birlikte planlayın.', 'Basınç hattı, elektrik ve drenaj ayrı proje bileşenleridir.', 'Pervane tedarikini komple istasyon kurulumuyla karıştırmayın.']),
 'tir-yikama-istasyonu-ekipmanlari': (2, 1, ['En büyük aracın yüksekliğini ve erişim alanını değerlendirin.', 'Teleskopik kolun kapalı ve açık boyunu dikkate alın.', 'Pompa ve altyapıyı pervane tedarikinden ayrı netleştirin.']),
}

def enrich(a, products):
 slug=a['route'].split('/')[-2]
 product_index, photo_index, takeaways=GUIDES[slug]
 p=products[product_index]
 a.update(image=p['images'][photo_index], image_alt=p['name']+' — gerçek ürün görünümü', product=p, takeaways=takeaways)
 a['reading_minutes']=max(1,round(len(BeautifulSoup(a['body'],'html.parser').get_text(' ',strip=True).split())/180))
 a['image_caption']=p['short']+' · Beta Makine ürün fotoğrafı.'
 if a['category']=='Seçim ve bütçe':
  other=products[1 if product_index==0 else 0]
  a.update(inline_image=other['images'][0], inline_alt=other['name']+' — model karşılaştırması için ürün fotoğrafı', inline_caption=other['short']+'; hat sayısı ve araç tipine göre diğer seçenekleri karşılaştırın.', inline_url=other['route'])
 elif a['category']=='Kurulum ve uyum':
  a.update(inline_image='/assets/images/guides/kurulum-planlama-illustrasyon.webp', inline_alt='Kabin planlama hazırlığını temsil eden çizim kâğıdı, şerit metre ve hortum illüstrasyonu', inline_caption='Planlama hazırlığını anlatan yapay zekâ destekli temsili görseldir; uygulama projesi veya ürün fotoğrafı değildir.', inline_url='/self-servis-oto-yikama-pervanesi/')
 else:
  a.update(inline_image='/assets/images/guides/bakim-kontrol-illustrasyon.webp', inline_alt='Bakım kontrolünü temsil eden bağlantı parçası, kumpas, bez ve kontrol lambası illüstrasyonu', inline_caption='Kontrol hazırlığını anlatan yapay zekâ destekli temsili görseldir; gerçek ürün yapısını veya bakım uygulamasını tarif etmez.', inline_url='/blog/oto-yikama-pervanesi-bakimi/')

def picture(src, alt, eager=False):
 # Size is a reserved display ratio; images retain their full content with contain.
 return '<img src="'+quote(src,safe='/.-')+'" alt="'+escape(alt)+'" width="1200" height="800" loading="'+('eager' if eager else 'lazy')+'" decoding="async"'+(' fetchpriority="high"' if eager else '')+'>'

def card(a):
 return '<article class="knowledge-card"><a class="knowledge-image" href="'+a['route']+'">'+picture(a['image'],a['image_alt'])+'</a><div class="knowledge-card-copy"><p class="eyebrow">'+a['category']+' · '+str(a['reading_minutes'])+' dk okuma</p><h3><a href="'+a['route']+'">'+escape(a['name'])+'</a></h3><p>'+escape(a['description'])+'</p><a class="text-link" href="'+a['route']+'">Rehberi okuyun <span aria-hidden="true">↗</span></a></div></article>'

def answer_box(a):
 return '<section class="answer-box" aria-label="Rehberin kısa özeti"><p class="eyebrow">Kısa cevap</p><ul>'+''.join('<li>'+escape(t)+'</li>' for t in a['takeaways'])+'</ul></section>'

def inline_figure(a):
 return '<figure class="guide-figure">'+picture(a['inline_image'],a['inline_alt'])+'<figcaption>'+escape(a['inline_caption'])+' <a href="'+a['inline_url']+'">İlgili bilgiyi inceleyin →</a></figcaption></figure>'
