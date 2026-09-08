"""Visible buying guidance; original product specifications remain in content.json."""
from html import escape

# Unmodified Lucide geometry. ISC notice accompanies the distributed HTML.
ICON_PATHS = {
    'rotate-cw': '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
    'sliders-horizontal': '<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>',
    'factory': '<path d="M12 16h.01"/><path d="M16 16h.01"/><path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M8 16h.01"/>',
}

FACTS = [
    ('rotate-cw', '360° hareket',
     'Tekli ve çiftli oto yıkama pervaneleri, hortumu yukarıdan taşıyarak araç çevresinde yönlendirmenize yardımcı olur. Dönüş alanı, kabin ölçüsü ve montaj noktasına göre planlanır.',
     '/boom-pervane/', 'Çalışma mantığını keşfedin'),
    ('sliders-horizontal', 'İhtiyacınıza göre',
     'Tek hortum için Z kol, köpük ve su için çiftli boom, ağır vasıta için teleskopik pervane. Araç tipi ve hat sayısınıza uygun modeli birlikte belirleyelim.',
     '/oto-yikama-pervanesi/', 'Modelleri karşılaştırın'),
    ('factory', 'Yerli üretim',
     'Bursa Nilüfer’de pervane ve döner bağlantı parçaları üretiyoruz. Model, bağlantı ölçüsü ve yedek parça ihtiyacınızı doğrudan üreticiyle görüşebilirsiniz.',
     '/about/', 'Beta Makine’yi tanıyın'),
]

CARD_COPY = {
    'tekli-z-oto-yikama-pervanesi': (
        'Tek su veya köpük hortumunun kullanıldığı binek araç kabinleri için. Z biçimli kol, hortumu üstten taşır; araç çevresindeki hareket alanı kabin yerleşimiyle birlikte değerlendirilir.',
        'Kabin ölçüsü, montaj noktası ve hortum uzunluğu.'),
    'ciftli-jel-kopuk-veya-normal-arac-yikama-pervanesi': (
        'Köpük ve basınçlı su hortumlarını aynı kabinde ayrı hatlar olarak kullanmak için. İki hortumun yerleşimini tek bir yıkama alanında planlamanıza yardımcı olur.',
        'İki hattın konumu, bağlantıları ve kol hareket alanı.'),
    'tir-yikama-pervanesi': (
        'Tır, kamyon ve otobüs yıkama alanlarının erişim ihtiyacı için. Açılır kapanır teleskopik kolun konumu, araç yüksekliği ve sahanın kullanılabilir alanıyla birlikte belirlenir.',
        'Araç ölçüleri, montaj yüksekliği ve erişim mesafesi.'),
    '1-4-yikama-pervanesi-doner-rekor': (
        'Boom pervanenin döner bağlantı noktasında kullanılan parça. Mevcut sistem için 2 veya 4 keçeli seçeneği belirlerken parçanın konumunu ve bağlantı ölçüsünü birlikte kontrol edin.',
        'Mevcut rekor fotoğrafı, diş standardı ve keçe seçeneği.'),
    'yikama-pervanesi-uc-rekoru': (
        'Hortumun pervane kolunun ucuna bağlandığı nokta için. Uç rekor seçimini yalnızca dış görünüşe göre değil, hortum bağlantısı ve sistemin çalışma bilgilerine göre yapın.',
        '1/4 veya 1/2 bağlantı seçeneği ve hortum uyumu.'),
    'arac-yikama-pervanesi-tabanca-doner-rekoru': (
        'Yıkama tabancası ile hortum arasındaki döner bağlantı için. Hortum burulmasını azaltmaya yardımcı olan bu parçanın ölçüsünü tabanca ve hortum bağlantısıyla eşleştirin.',
        '3/8 veya 1/2 diş seçeneği ve tabanca bağlantısı.'),
}

HOME_QUESTIONS = [
    {'q': 'Oto yıkama pervanesi ne işe yarar?',
     'a': 'Pervane, yıkama hortumunu yukarıdan taşıyan ve araç çevresinde yönlendiren kol sistemidir. Sektörde boom, pergel veya hortum askı pervanesi adlarıyla da anılır. Pompa gibi basınç üretmez; hortumun çalışma alanını düzenler.'},
    {'q': 'Tekli Z mi, çiftli boom mu seçmeliyim?',
     'a': 'Aynı kabinde tek hortum kullanılacaksa tekli Z; köpük ve su için iki ayrı hortum kullanılacaksa çiftli boom değerlendirilir. Kabin sayısı tek başına bu kararı verdirmez. Her kabinin hat ihtiyacı ve yerleşimi ayrıca belirlenmelidir.'},
    {'q': 'Mevcut sistem için hangi döner rekor uygundur?',
     'a': 'Önce parçanın pervane gövdesinde, kol ucunda veya tabanca bağlantısında mı olduğunu belirleyin. Ardından diş ölçüsünü, bağlantı standardını ve sistemin çalışma bilgilerini paylaşın. Fotoğraf ön değerlendirmeye yardımcı olur; ölçü ve teknik uyum doğrulanmadan parça seçilmemelidir.'},
    {'q': 'Pervane fiyat teklifi almak için ne göndermeliyim?',
     'a': 'Model veya kullanım amacı, istenen adet, kabin ölçüleri, hortum sayısı ve teslimat şehrini paylaşın. Mevcut bir sistemi yeniliyorsanız bağlantı fotoğraflarını da ekleyin. Dahil olan parçalar, stok, teslim süresi ve garanti kapsamı yazılı teklifte netleştirilir.'},
]

def feature_facts():
    items = []
    for name, title, description, route, label in FACTS:
        icon = ('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" '
                'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
                'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
                + ICON_PATHS[name] + '</svg>')
        items.append('<li><span class="fact-icon" aria-hidden="true">' + icon
                     + '</span><div class="fact-copy"><h2>' + escape(title) + '</h2><p>'
                     + escape(description) + '</p><a class="text-link" href="' + route + '">'
                     + escape(label) + ' <span aria-hidden="true">↗</span></a></div></li>')
    return ('<!-- Lucide icons: ISC, Copyright (c) 2026 Lucide Icons and Contributors. '
            'License: /assets/licenses/lucide.txt -->'
            '<ul class="home-facts" id="pervane-ozellikleri" aria-label="Pervane sistemleri ve üretim">'
            + ''.join(items) + '</ul>')

def card_description(product):
    description, preparation = CARD_COPY[product['route'].split('/')[-2]]
    return '<p class="card-description">' + escape(description) + '</p><p class="card-preparation"><strong>Seçim öncesi</strong> ' + escape(preparation) + '</p>'
