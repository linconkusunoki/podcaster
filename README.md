# Podcaster

A React SPA for browsing Apple Podcasts with catalog, podcast detail, and episode detail views.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Production (local)

```bash
npm run build
npm run preview
```

## Testing

```bash
npm test              # unit + integration
npm run e2e           # browser E2E
npm run e2e:headed   # browser E2E with visible window
```

## Architecture

- `src/domain/` — Podcast and Episode models
- `src/application/` — use cases and repository ports
- `src/infrastructure/` — iTunes DTOs, mappers, HTTP client, cache
- `src/presentation/` — router, pages, components, styles
- `tests/` — unit, integration, accessibility, and E2E suites
