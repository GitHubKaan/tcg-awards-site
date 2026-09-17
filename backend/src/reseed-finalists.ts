// One-off maintenance script: force-writes the `finalists` content document
// from the baked-in defaults into the database, overwriting whatever is there.
//
// Use it when the finalists row is missing or stale (e.g. the backend was
// running old compiled code when the key was introduced, so `seedContent()`
// never inserted it). Normal seeding only inserts *missing* keys and never
// overwrites, so this script exists to deliberately (re)insert.
//
//   npx tsx src/reseed-finalists.ts        (from the backend/ directory)
//
import { db } from "./db";
import { DEFAULT_CONTENT } from "../shared/content.defaults";

const now = new Date().toISOString();
const value = JSON.stringify(DEFAULT_CONTENT.finalists);

db.prepare(
    `INSERT INTO content (key, value, updated_at) VALUES (@key, @value, @now)
     ON CONFLICT(key) DO UPDATE SET value = @value, updated_at = @now`
).run({ key: "finalists", value, now });

const row = db.prepare("SELECT length(value) AS len, updated_at FROM content WHERE key = ?").get("finalists");
console.log("finalists reseeded:", row);
