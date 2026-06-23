import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { DEFAULT_CONTENT } from "../shared/content.defaults";
import { CONTENT_KEYS, ContentKey, SiteContent } from "../shared/content.types";

const DATA_DIR = path.join(__dirname, "..", "data");
fs.mkdirSync(DATA_DIR, { recursive: true });

export const db = new Database(path.join(DATA_DIR, "content.db"));
db.pragma("journal_mode = WAL");

db.exec(`
    CREATE TABLE IF NOT EXISTS content (
        key        TEXT PRIMARY KEY,
        value      TEXT NOT NULL,
        updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS media (
        id         TEXT PRIMARY KEY,
        filename   TEXT NOT NULL,
        original   TEXT NOT NULL,
        mimetype   TEXT NOT NULL,
        size       INTEGER NOT NULL,
        created_at TEXT NOT NULL
    );
`);

/** Insert default content for any key that does not yet exist (idempotent). */
export function seedContent(): void {
    const exists = db.prepare("SELECT 1 FROM content WHERE key = ?");
    const insert = db.prepare(
        "INSERT INTO content (key, value, updated_at) VALUES (?, ?, ?)"
    );
    const now = new Date().toISOString();
    const tx = db.transaction(() => {
        for (const key of CONTENT_KEYS) {
            if (!exists.get(key)) {
                insert.run(key, JSON.stringify(DEFAULT_CONTENT[key]), now);
            }
        }
    });
    tx();
}

export function getAllContent(): Partial<SiteContent> {
    const rows = db.prepare("SELECT key, value FROM content").all() as {
        key: string;
        value: string;
    }[];
    const out: Record<string, unknown> = {};
    for (const row of rows) out[row.key] = JSON.parse(row.value);
    return out as Partial<SiteContent>;
}

export function getContent(key: ContentKey): unknown | undefined {
    const row = db.prepare("SELECT value FROM content WHERE key = ?").get(key) as
        | { value: string }
        | undefined;
    return row ? JSON.parse(row.value) : undefined;
}

export function setContent(key: ContentKey, value: unknown): void {
    db.prepare(
        `INSERT INTO content (key, value, updated_at) VALUES (?, ?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
    ).run(key, JSON.stringify(value), new Date().toISOString());
}

export interface MediaRow {
    id: string;
    filename: string;
    original: string;
    mimetype: string;
    size: number;
    created_at: string;
}

export function insertMedia(row: MediaRow): void {
    db.prepare(
        `INSERT INTO media (id, filename, original, mimetype, size, created_at)
         VALUES (@id, @filename, @original, @mimetype, @size, @created_at)`
    ).run(row);
}

export function listMedia(): MediaRow[] {
    return db
        .prepare("SELECT * FROM media ORDER BY created_at DESC")
        .all() as MediaRow[];
}

export function getMedia(id: string): MediaRow | undefined {
    return db.prepare("SELECT * FROM media WHERE id = ?").get(id) as
        | MediaRow
        | undefined;
}

export function deleteMedia(id: string): void {
    db.prepare("DELETE FROM media WHERE id = ?").run(id);
}
