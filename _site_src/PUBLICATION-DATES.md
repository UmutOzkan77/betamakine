# Yayın tarihi kanıtı — 12 Ekim 2026 düzeltmesi

PR #12'de yedi rehbere eklenen tarihler, ilk başarılı canlı yayın kayıtlarıyla
uyuşmuyordu. Git'e ilk eklenme veya eski JSON-LD değeri, tek başına kamuya açık
yayını kanıtlamaz. GitHub Pages'teki ilk başarılı `deploy` işi ise ilgili commit
ağacındaki sayfanın yayınlandığını gösteren izlenebilir kayıttır.

Bu yedi rehberin `datePublished` değeri, sayfayı içeren ilk başarılı GitHub Pages
deploy başlangıç anının `Europe/Istanbul` takvim gününe göre düzeltildi. Görünür
`Yayın` alanı aynı değerle eşleştirildi; `Güncelleme` / `dateModified` ve yazı
gövdeleri değiştirilmedi.

| Rehber son eki | PR #12 değeri | Doğrulanan yayın günü | Başarılı Pages çalışması |
| --- | --- | --- | --- |
| balans-ayari | 2026-03-05 | 2026-03-19 | [23297999933](https://github.com/UmutOzkan77/betamakine/actions/runs/23297999933) |
| donmuyor | 2026-02-02 | 2026-03-07 | [22802237044](https://github.com/UmutOzkan77/betamakine/actions/runs/22802237044) |
| kisin-donma-sorunu | 2026-02-02 | 2026-03-07 | [22802237044](https://github.com/UmutOzkan77/betamakine/actions/runs/22802237044) |
| mil-boslugu-olcumu | 2026-03-05 | 2026-03-19 | [23297999933](https://github.com/UmutOzkan77/betamakine/actions/runs/23297999933) |
| rulman-arizasi | 2026-03-05 | 2026-03-10 | [22899955141](https://github.com/UmutOzkan77/betamakine/actions/runs/22899955141) |
| ses-yapiyor | 2026-02-02 | 2026-03-05 | [22704917201](https://github.com/UmutOzkan77/betamakine/actions/runs/22704917201) |
| yaglama-noktalari | 2026-03-05 | 2026-03-10 | [22899955141](https://github.com/UmutOzkan77/betamakine/actions/runs/22899955141) |

GitHub API üzerinden bu çalışmaların `build`, `deploy` ve
`report-build-status` işlerinin `completed/success` olduğu 12 Ekim 2026'da
yeniden doğrulandı. Tam commit kimlikleri, saat dilimli başlangıç anları, önceki
şema değerleri ve çalışma bağlantıları `publication_date_review.json` içindedir.

## Yeniden doğrulama yöntemi

1. Tam yolun ilk eklenmesini `git log --no-renames --diff-filter=A` ile bulun.
2. Başarılı Pages çalışmalarını eskiden yeniye sıralayın.
3. İlgili yolun çalışma commit ağacında bulunduğu ilk başarılı `deploy` kaydını
   seçin.
4. `run_started_at` anını `Europe/Istanbul` saat dilimine çevirip takvim gününü
   `datePublished` olarak kullanın.
5. Görünür tarih, JSON-LD, kanıt kaydı ve testleri birlikte güncelleyin.

`verify_source_evidence`, ilk eklenme kayıtlarını gerçek Git nesneleriyle,
deploy commit'inde dosyanın varlığını, Türkiye gününe dönüşümü ve değişmez
çalışma URL'sini denetler. Dış GitHub kaydının gerçekten başarılı olduğu PR
incelemesinde ayrıca kontrol edilir; çevrimdışı build ağı gerektirmez.

## Komutlar

```sh
python3 _site_src/build.py
python3 _site_src/publication_dates.py
python3 -m unittest discover -s _site_src -p 'test_*.py'
python3 _site_src/verify.py
```

Tam `verify.py` ürün görsellerine ve eski Git commit'lerine ihtiyaç duyar. Yalnız
tarih testlerinin geçmesi, tüm site regresyon testlerinin geçtiği anlamına gelmez.
