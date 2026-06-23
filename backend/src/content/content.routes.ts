import { Router } from "express";
import { getAllContent, getContent, setContent } from "../db";
import { requireAuth } from "../auth/auth.middleware";
import { CONTENT_SCHEMAS } from "./content.schema";
import { CONTENT_KEYS, ContentKey } from "../../shared/content.types";

const router = Router();

function isContentKey(key: string): key is ContentKey {
    return (CONTENT_KEYS as string[]).includes(key);
}

// Public: full content document used by the frontend.
router.get("/", (_req, res) => {
    res.json(getAllContent());
});

// Public: single content document.
router.get("/:key", (req, res) => {
    const { key } = req.params;
    if (!isContentKey(key)) {
        res.status(404).json({ error: "Unknown content key" });
        return;
    }
    const value = getContent(key);
    if (value === undefined) {
        res.status(404).json({ error: "Not found" });
        return;
    }
    res.json(value);
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
    setContent(key, parsed.data);
    res.json({ ok: true, value: parsed.data });
});

export default router;
