import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { requireAuth } from "../auth/auth.middleware";
import { deleteMedia, getMedia, insertMedia, listMedia } from "../db";

// Resolved from the working directory so uploads survive rebuilds.
export const UPLOADS_DIR = path.join(process.cwd(), "uploads");
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const CDN_PUBLIC_URL = (process.env.CDN_PUBLIC_URL || "http://localhost:4000").replace(/\/$/, "");

function safeExt(name: string): string {
    const ext = path.extname(name).toLowerCase();
    return /^\.[a-z0-9]{1,8}$/.test(ext) ? ext : "";
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
    filename: (_req, file, cb) => cb(null, `${uuid()}${safeExt(file.originalname)}`),
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});

const router = Router();

const cdnUrl = (filename: string) => `${CDN_PUBLIC_URL}/cdn/${filename}`;

// Upload a single file. Returns its CDN url.
router.post("/", requireAuth, upload.single("file"), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded (field name must be 'file')" });
        return;
    }
    const id = uuid();
    insertMedia({
        id,
        filename: req.file.filename,
        original: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        created_at: new Date().toISOString(),
    });
    res.status(201).json({ id, url: cdnUrl(req.file.filename), filename: req.file.filename });
});

// List uploaded media (for the admin media browser).
router.get("/", requireAuth, (_req, res) => {
    res.json(
        listMedia().map((m) => ({
            id: m.id,
            url: cdnUrl(m.filename),
            original: m.original,
            mimetype: m.mimetype,
            size: m.size,
            createdAt: m.created_at,
        }))
    );
});

// Delete an uploaded file.
router.delete("/:id", requireAuth, (req, res) => {
    const media = getMedia(req.params.id);
    if (!media) {
        res.status(404).json({ error: "Not found" });
        return;
    }
    fs.rm(path.join(UPLOADS_DIR, media.filename), { force: true }, () => {});
    deleteMedia(media.id);
    res.json({ ok: true });
});

export default router;
