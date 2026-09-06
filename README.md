# MyStack Framework website

Official static website source for [mystack-framework.github.io](https://mystack-framework.github.io/).

The website represents MyStack as a versionless framework following the rolling official `main` branch. Framework source, ownership, license, contribution rules and generated API documentation remain authoritative in the [official repository](https://github.com/mystack-framework/mystack).

## Contents

- Responsive, accessible framework landing page
- 5+ year development story, verified metrics band, quick-start steps and FAQ with `FAQPage` structured data
- Searchable core-library catalog
- Source-generated documentation portal under `docs/`
- AI discovery files: `llms.txt` and `llms-full.txt`
- Search discovery through `robots.txt`, `sitemap.xml`, canonical metadata and structured data
- Explicit all-crawler policy: every search engine, AI assistant and bot is allowed by name in `robots.txt`
- Static-site build opt-out through `.nojekyll` (raw `docs/*.md` and JSON must stay byte-exact)
- Coordinated disclosure pointer through `.well-known/security.txt`
- Branded Open Graph/X social preview under `assets/`
- Responsive motion, touch navigation, keyboard access and reduced-motion support
- Install metadata through `site.webmanifest`
- Official MyStack Framework Helper and `mystack-extension` repository discovery
- Apache License 2.0 attribution and official project links

The documentation files are generated from the framework source. Refresh them in the framework repository with `php mystack docs:build`, then synchronize the generated `docs/` and LLM discovery files here.
