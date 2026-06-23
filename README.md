<img src="frontend/src/assets/logo_text.png" width="200px"/><br>

# TCG AWARDS SITE

Made by <a href="www.turanics.com">Turanics</a>

This repository is split into two parts:

| Folder      | What it is                                                                 |
| ----------- | -------------------------------------------------------------------------- |
| `frontend/` | The public marketing site (Create React App) **and** the `/admin` CMS UI.  |
| `backend/`  | Express.js API: password login, content store (SQLite) and a CDN for media. |

The entire frontend content is editable through `/admin`, which talks to the backend
API. Uploaded images/files are served from the backend's `/cdn` endpoint.

## Quick start (local)

### 1. Backend

```bash
cd backend
cp .env.example .env      # then set ADMIN_PASSWORD and JWT_SECRET
npm install
npm run dev               # http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env      # REACT_APP_API_URL defaults to http://localhost:4000
npm install
npm run dev               # http://localhost:3000
```

Open `http://localhost:3000` for the site and `http://localhost:3000/admin` for the CMS
(log in with the `ADMIN_PASSWORD` you set in `backend/.env`).

## How the content works

- The backend seeds its SQLite database with the site's default content on first run.
- The frontend fetches all content from `GET /api/content` and falls back to baked-in
  defaults if the backend is unreachable, so the site never renders empty.
- Editing content in `/admin` issues authenticated `PUT /api/content/:key` requests and
  uploads images via `POST /api/media`; saved changes persist in SQLite.

See `backend/README.md` and `frontend/README.md` for details.
