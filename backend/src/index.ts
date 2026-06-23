import "dotenv/config";
import express from "express";
import cors from "cors";
import { seedContent } from "./db";
import authRoutes from "./auth/auth.routes";
import contentRoutes from "./content/content.routes";
import mediaRoutes, { UPLOADS_DIR } from "./media/media.routes";

seedContent();

const app = express();
const PORT = Number(process.env.PORT || 4000);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(
    cors({
        origin: CORS_ORIGIN.split(",").map((o) => o.trim()),
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(express.json({ limit: "2mb" }));

// CDN: long-lived, immutable caching for uploaded assets.
app.use(
    "/cdn",
    express.static(UPLOADS_DIR, {
        immutable: true,
        maxAge: "1y",
        setHeaders: (res) => {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        },
    })
);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/media", mediaRoutes);

app.listen(PORT, () => {
    if (!process.env.ADMIN_PASSWORD) {
        console.warn("⚠  ADMIN_PASSWORD is not set — admin login will fail. Set it in backend/.env");
    }
    if (!process.env.JWT_SECRET) {
        console.warn("⚠  JWT_SECRET is not set — using an insecure dev secret. Set it in backend/.env");
    }
    console.log(`TCG Awards backend listening on http://localhost:${PORT}`);
});
