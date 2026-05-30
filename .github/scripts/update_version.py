"""Replace <code class="version">...</code> in all HTML files."""
import os, re, sys

def main():
    if len(sys.argv) < 2:
        print('Usage: update_version.py <version-string>')
        sys.exit(1)

    version = sys.argv[1]
    pattern = re.compile(r'<code class="version">[^<]*</code>')
    replacement = f'<code class="version">{version}</code>'

    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in ('old-files', '.git')]
        for fname in files:
            if not fname.endswith('.html'):
                continue
            path = os.path.join(root, fname)
            with open(path, encoding='utf-8') as f:
                content = f.read()
            updated = pattern.sub(replacement, content)
            if updated != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(updated)
                print(f'Updated: {path}')

if __name__ == '__main__':
    main()
