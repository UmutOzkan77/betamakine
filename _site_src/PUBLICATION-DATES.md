# Yayın tarihi kanıtı — 5 Ekim 2026 düzeltmesi

PR #12'deki yedi yayın tarihi, dayanak gösterilen ilk Git eklenme kayıtlarıyla
uyuşmuyor. Git'e eklenme, kamuya açık yayın anını kanıtlamaz. Commit mesajında
“publish” yazması veya eski JSON-LD'de tarih bulunması da başarılı bir dağıtımın
bağımsız kanıtı değildir. Bu nedenle bu yedi rehberde görünür `Yayın` alanı ve
JSON-LD `datePublished` kaldırıldı; mevcut `Güncelleme` / `dateModified` korundu.
Yazı gövdeleri değiştirilmedi.

| Rehber son eki | PR #12 değeri | İlk eklenme (UTC) | İlk dosyadaki datePublished (Türkiye saati) |
| --- | --- | --- | --- |
| balans-ayari | 2026-03-05 | 2026-03-12 | 2026-03-12 |
| donmuyor | 2026-02-02 | 2026-03-07 | 2026-03-07 |
| kisin-donma-sorunu | 2026-02-02 | 2026-03-07 | 2026-03-06 |
| mil-boslugu-olcumu | 2026-03-05 | 2026-03-11 | 2026-03-11 |
| rulman-arizasi | 2026-03-05 | 2026-03-09 | 2026-03-08 |
| ses-yapiyor | 2026-02-02 | 2026-03-05 | 2026-03-05 |
| yaglama-noktalari | 2026-03-05 | 2026-03-10 | 2026-03-10 |

Tam commit kimlikleri, saat dilimli tarihler ve değişmez kaynak bağlantıları
`publication_date_review.json` içindedir. Her dosya ilgili commit'in değişiklik
listesinde `added` olarak doğrulandı. Bunlar tarih iddialarının izlenebilir
kaynaklarıdır; kesin yayın tarihi olarak kullanılmazlar.

`git log --follow` benzer/kopyalanmış bir yazıyı eski başka bir dosyaya kadar
izleyebilir. Örneğin balans rehberinde 5 Mart sonucunu üretirken, mevcut yolun
ilk eklenmesi 12 Marttır. Bu incelemenin tekrarında tam yol için
`git log --no-renames --diff-filter=A` kullanılır; eski JSON-LD ayrıca okunur.
`verify_source_evidence` bu kayıtları gerçek Git nesneleriyle karşılaştırır.

## Sınırlar ve sonraki doğrulama

- Yedi kayıt `unconfirmed` durumundadır; Git günü, build günü veya güncelleme
  tarihi yayın tarihi yerine kullanılmaz
- Diğer 11 rehberin PR #12'deki değerleri bu dar düzeltmenin dışında korunmuştur;
  bu çalışma onların gerçek kamuya açık yayın tarihlerini doğrulamış değildir
- Yayın tarihini geri eklemeden önce site sahibinin yayın kaydı, tarihli arşiv
  veya ilgili sayfanın dağıtım kaydı incelenmeli; kanıtın tam olarak neyi
  doğruladığı açıklanmalı ve inceleme kaydı/testler birlikte güncellenmeli
- Geçerli `YYYY-MM-DD`, görünür/şema tutarlılığı ve bu yedi rotada desteklenmeyen
  tarih bulunmaması `publication_dates.py` tarafından bağımsız denetlenir
- `test_publication_dates.py`, görünür ve şemada birbiriyle tutarlı olsa bile
  desteklenmeyen yayın tarihinin testi geçemediğini de kontrol eder

## Komutlar

```sh
python3 _site_src/build.py
python3 _site_src/publication_dates.py
python3 -m unittest discover -s _site_src -p 'test_*.py'
python3 _site_src/verify.py
```

Tam `verify.py` ürün görsellerine ve eski Git commit'lerine de ihtiyaç duyar.
Birim testlerinin kaynak kanıtı testi de tam Git geçmişi gerektirir.
Yalnız tarih testlerinin geçmesi, tüm site regresyon testlerinin geçtiği anlamına
gelmez. Bu düzeltme yayın veya birleştirme yetkisi içermez; taslak PR'de incelenir.
