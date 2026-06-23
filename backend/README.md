# TCG Awards — Backend

Express.js (TypeScript) API that powers the site's content and acts as a CDN for
uploaded media. Content is stored in a local **SQLite** database.

## Setup

```bash
cp .env.example .env     # set ADMIN_PASSWORD and JWT_SECRET
npm install
npm run dev              # tsx watch, http://localhost:4000
```

Production:

```bash
npm run build && npm start
```

## Environment

| Var              | Purpose                                              |
| ---------------- | ---------------------------------------------------- |
| `PORT`           | Port to listen on (default 4000).                    |
| `ADMIN_PASSWORD` | Password required to log into `/admin`.              |
| `JWT_SECRET`     | Secret used to sign session tokens.                  |
| `CORS_ORIGIN`    | Allowed frontend origin(s), comma-separated.         |
| `CDN_PUBLIC_URL` | Public base URL used to build `/cdn/...` media links.|

## API

| Method & path             | Auth | Description                                  |
| ------------------------- | ---- | -------------------------------------------- |
| `POST /api/auth/login`    | —    | `{ password }` → `{ token }`.                |
| `GET  /api/auth/me`       | ✅   | Session check.                               |
| `GET  /api/content`       | —    | Full content document (all keys).            |
| `GET  /api/content/:key`  | —    | One content document.                        |
| `PUT  /api/content/:key`  | ✅   | Replace a content document (zod-validated).  |
| `POST /api/media`         | ✅   | Multipart upload (field `file`) → `{ url }`. |
| `GET  /api/media`         | ✅   | List uploaded media.                         |
| `DELETE /api/media/:id`   | ✅   | Delete an uploaded file.                     |
| `GET  /cdn/<file>`        | —    | Serves uploaded media (immutable cache).     |

Auth is a Bearer JWT sent as `Authorization: Bearer <token>`.

## Data

- `data/content.db` — SQLite database (content + media metadata).
- `uploads/` — uploaded files served from `/cdn`.

Both are gitignored. Content keys are seeded from `shared/content.defaults.ts` on
first run; existing rows are never overwritten by seeding.

> `shared/content.types.ts` and `shared/content.defaults.ts` are mirrored in
> `frontend/src/content/`. Keep the two copies in sync.
