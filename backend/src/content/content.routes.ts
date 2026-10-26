import { Router } from "express";
import { getAllContent, getContent, getContentMeta, setContent } from "../db";
import { requireAuth } from "../auth/auth.middleware";
import { CONTENT_SCHEMAS } from "./content.schema";
import { CONTENT_KEYS, ContentKey } from "../../shared/content.types";
import { DEFAULT_CONTENT } from "../../shared/content.defaults";

const router = Router();

function isContentKey(key: string): key is ContentKey {
    return (CONTENT_KEYS as string[]).includes(key);
}

// Content changes whenever an admin saves, so it must never be served from a
// browser/proxy/CDN cache — otherwise some visitors keep seeing a stale copy
// after an edit. Force revalidation on every content response.
router.use((_req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

// Public: full content document used by the frontend.
router.get("/", (_req, res) => {
    res.json(getAllContent());
});

// Public: when a content document was last changed (ISO timestamp).
router.get("/:key/meta", (req, res) => {
    const { key } = req.params;
    if (!isContentKey(key)) {
        res.status(404).json({ error: "Unknown content key" });
        return;
    }
    res.json({ updatedAt: getContentMeta(key) ?? null });
});

// Public: single content document.
router.get("/:key", (req, res) => {
    const { key } = req.params;
    if (!isContentKey(key)) {
        res.status(404).json({ error: "Unknown content key" });
        return;
    }
    // Fall back to the baked-in default for a known key that has no stored row
    // yet (e.g. a key added after this database was first seeded). seedContent()
    // fills these in on the next startup; this keeps the admin editor working
    // in the meantime instead of 404-ing.
    const value = getContent(key);
    res.json(value === undefined ? DEFAULT_CONTENT[key] : value);
});

// Protected: update a single content document (validated against its schema).
router.put("/:key", requireAuth, (req, res) => {
    const { key } = req.params;
    if (!isContentKey(key)) {
        res.status(404).json({ error: "Unknown content key" });
        return;
    }
    const parsed = CONTENT_SCHEMAS[key].safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
        return;
    }
    const updatedAt = setContent(key, parsed.data);
    res.json({ ok: true, value: parsed.data, updatedAt });
});

export default router;
