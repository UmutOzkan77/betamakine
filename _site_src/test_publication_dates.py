"""Regressions for unsupported, malformed and inconsistent dates."""
from pathlib import Path
import json, unittest
from bs4 import BeautifulSoup
from publication_dates import verify_all, verify_publication_dates, verify_source_evidence

ROOT = Path(__file__).resolve().parents[1]
ROUTE = '/blog/oto-yikama-pervanesi-balans-ayari/'


class PublicationDateTests(unittest.TestCase):
    def setUp(self):
        self.soup = BeautifulSoup((ROOT / ROUTE.lstrip('/') / 'index.html').read_text(), 'html.parser')
        graph = json.loads(self.soup.select_one('script[type="application/ld+json"]').string)['@graph']
        self.article = next(x for x in graph if 'BlogPosting' in x.get('@type', []))

    def test_all_generated_guides(self):
        self.assertEqual(verify_all(ROOT), [])

    def test_review_matches_git_sources(self):
        self.assertEqual(verify_source_evidence(ROOT), [])

    def test_consistent_but_unsupported_date_fails(self):
        self.article['datePublished'] = '2026-03-12'
        tag = self.soup.new_tag('time', datetime='2026-03-12')
        tag.string = '12 Mart 2026'
        self.soup.select_one('.article-meta').insert(0, tag)
        self.assertIn(ROUTE + ': unconfirmed publication date emitted',
                      verify_publication_dates(ROOT, ROUTE, self.soup, self.article))

    def test_invalid_calendar_date_fails(self):
        self.article['dateModified'] = '2026-02-30'
        self.assertTrue(verify_publication_dates(ROOT, ROUTE, self.soup, self.article))

    def test_visible_date_mismatch_fails(self):
        self.soup.select_one('.article-meta time')['datetime'] = '2026-09-09'
        self.assertTrue(verify_publication_dates(ROOT, ROUTE, self.soup, self.article))

    def test_unconfirmed_visible_label_fails(self):
        self.soup.select_one('.article-meta').append('Yayın: bilinmiyor')
        self.assertTrue(verify_publication_dates(ROOT, ROUTE, self.soup, self.article))


if __name__ == '__main__':
    unittest.main()
