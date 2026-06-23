import { Router } from "express";
import { requireAuth, signToken } from "./auth.middleware";

const router = Router();

router.post("/login", (req, res) => {
    const { password } = req.body ?? {};
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected) {
        res.status(500).json({ error: "Server is missing ADMIN_PASSWORD" });
        return;
    }
    if (typeof password !== "string" || password !== expected) {
        res.status(401).json({ error: "Invalid password" });
        return;
    }
    res.json({ token: signToken() });
});

// Lightweight session check used by the admin UI.
router.get("/me", requireAuth, (_req, res) => {
    res.json({ ok: true });
});

export default router;
