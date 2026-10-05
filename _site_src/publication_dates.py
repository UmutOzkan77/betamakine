"""Date checks independent of the renderer; also runnable without Git history/assets."""
from datetime import date
from pathlib import Path
import json
import subprocess
from bs4 import BeautifulSoup


def verify_publication_dates(root, route, soup, article):
    review = json.loads((root / '_site_src/publication_date_review.json').read_text())
    errors = []
    def check(ok, message):
        if not ok:
            errors.append(route + ': ' + message)
    def valid(value):
        try:
            return isinstance(value, str) and date.fromisoformat(value).isoformat() == value
        except ValueError:
            return False
    published = article.get('datePublished')
    modified = article.get('dateModified')
    check(valid(modified), 'invalid modification date')
    dates = [n['datetime'] for n in soup.select('.article-meta time[datetime]')]
    meta = soup.select_one('.article-meta')
    check(bool(meta), 'visible article metadata missing')
    record = review.get(route)
    if record:
        check(record.get('status') == 'unconfirmed' and record.get('publication_date') is None,
              'reviewed publication status requires renewed source review')
        check('datePublished' not in article, 'unconfirmed publication date emitted')
        check(not meta or 'Yayın:' not in meta.get_text(), 'unconfirmed publication label emitted')
    else:
        check(valid(published), 'legacy publication date missing or invalid')
    expected = ([published] if published else []) + [modified]
    check(dates == expected, 'visible/schema dates mismatch')
    if valid(published) and valid(modified):
        check(published <= modified, 'publication date after modification date')
    return errors


def verify_all(root):
    errors = []
    data = json.loads((root / '_site_src/content.json').read_text())
    for item in data['articles']:
        route = item['route']
        soup = BeautifulSoup((root / route.lstrip('/') / 'index.html').read_text(), 'html.parser')
        graph = json.loads(soup.select_one('script[type="application/ld+json"]').string)['@graph']
        article = next(x for x in graph if 'BlogPosting' in x.get('@type', []))
        errors.extend(verify_publication_dates(root, route, soup, article))
    return errors


def verify_source_evidence(root):
    """Check review records against immutable Git sources, not renderer constants."""
    review = json.loads((root / '_site_src/publication_date_review.json').read_text())
    errors = []
    for route, record in review.items():
        path = route.lstrip('/') + 'index.html'
        sha = record['first_added_commit']
        def git(*args):
            return subprocess.check_output(['git', *args], cwd=root, text=True).strip()
        try:
            additions = git('log', '--no-renames', '--diff-filter=A', '--format=%H', '--', path).splitlines()
            timestamp = git('show', '-s', '--format=%aI', sha)
            original = BeautifulSoup(git('show', sha + ':' + path), 'html.parser')
            values = []
            def collect(value):
                if isinstance(value, dict):
                    if 'datePublished' in value:
                        values.append(value['datePublished'])
                    for child in value.values():
                        collect(child)
                elif isinstance(value, list):
                    for child in value:
                        collect(child)
            for node in original.select('script[type="application/ld+json"]'):
                collect(json.loads(node.string))
            # %aI may use +00:00 where the API uses Z.
            from datetime import datetime
            if (not additions or additions[-1] != sha
                    or datetime.fromisoformat(timestamp) != datetime.fromisoformat(record['first_added_author_timestamp'])
                    or values != [record['original_schema_date_published']]):
                errors.append(route + ': publication review evidence differs from Git source')
        except (subprocess.CalledProcessError, ValueError, KeyError) as exc:
            errors.append(route + ': cannot verify publication source evidence: ' + str(exc))
    return errors


if __name__ == '__main__':
    errors = verify_all(Path(__file__).resolve().parents[1])
    print(json.dumps({'guides_checked': 18, 'errors': errors}, ensure_ascii=False, indent=2))
    raise SystemExit(bool(errors))
