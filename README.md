# canapi-website
The official Canapi marketing site — [canapi.io](https://www.canapi.io)

Informational website covering what Canapi is, what it does, and how to integrate it. Also links to documentation at [docs.canapi.io](https://docs.canapi.io).

## Stack

Built on [Eleventy (11ty)](https://www.11ty.dev/) using the [`@terrabyte/web-ui`](https://github.com/terrabyte-tech/terrabyte-web-ui) shared package and the `terrabyte-11ty-starter` pattern.

## Dev

```
pnpm install
pnpm start
```

Builds to `_site/`.

## Structure

| Path | Purpose |
|---|---|
| `_data/site.json` | Site metadata (title, URL, theme, etc.) |
| `src/index.njk` | Homepage — hero, about, process, newsletter |
| `src/_includes/partials/header.njk` | Site header and nav |
| `src/_includes/layouts/project-base.njk` | Extends web-ui `base.njk` |
| `src/css/site-styles.css` | Project-specific styles |

## Notes

- `site.project: "Canapi"` within `site.json` triggers `shared-canapi-styles.css` being added to the `<head>` element (from the @terrabyte/web-ui package)
- `docs.canapi.io` no longer exists; replaced with `canapi.io/docs`