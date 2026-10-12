"""Date checks independent of the renderer; also runnable without Git history/assets."""
from datetime import date, datetime
from pathlib import Path
import json
import subprocess
from zoneinfo import ZoneInfo
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
        except (TypeError, ValueError):
            return False
    published = article.get('datePublished')
    modified = article.get('dateModified')
    check(valid(modified), 'invalid modification date')
    dates = [n['datetime'] for n in soup.select('.article-meta time[datetime]')]
    meta = soup.select_one('.article-meta')
    check(bool(meta), 'visible article metadata missing')
    record = review.get(route)
    if record:
        check(record.get('status') == 'confirmed_successful_pages_deploy',
              'reviewed publication status is not confirmed')
        check(valid(record.get('publication_date')), 'reviewed publication date invalid')
        check(published == record.get('publication_date'), 'reviewed publication date mismatch')
        check(bool(meta) and 'Yayın:' in meta.get_text(), 'confirmed publication label missing')
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
            deploy_sha = record['first_successful_deploy_commit']
            deploy_timestamp = datetime.fromisoformat(
                record['first_successful_deploy_started_at'].replace('Z', '+00:00'))
            local_deploy_day = deploy_timestamp.astimezone(ZoneInfo('Europe/Istanbul')).date().isoformat()
            deploy_has_path = subprocess.run(
                ['git', 'cat-file', '-e', deploy_sha + ':' + path], cwd=root,
                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode == 0
            run_id = record['first_successful_deploy_run_id']
            expected_source = 'https://github.com/UmutOzkan77/betamakine/actions/runs/' + str(run_id)
            # %aI may use +00:00 where the API uses Z.
            if (not additions or additions[-1] != sha
                    or datetime.fromisoformat(timestamp) != datetime.fromisoformat(record['first_added_author_timestamp'])
                    or values != [record['original_schema_date_published']]
                    or not deploy_has_path
                    or local_deploy_day != record['publication_date']
                    or record['source'] != expected_source):
                errors.append(route + ': publication review evidence differs from Git source')
        except (subprocess.CalledProcessError, ValueError, KeyError) as exc:
            errors.append(route + ': cannot verify publication source evidence: ' + str(exc))
    return errors


if __name__ == '__main__':
    errors = verify_all(Path(__file__).resolve().parents[1])
    print(json.dumps({'guides_checked': 18, 'errors': errors}, ensure_ascii=False, indent=2))
    raise SystemExit(bool(errors))
