import { API_BASE } from "../content/assets";
import { ContentKey } from "../content/content.types";

const TOKEN_KEY = "tcg_admin_token";

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

function authHeaders(): Record<string, string> {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export class AuthError extends Error {}

async function handle(res: Response) {
    if (res.status === 401) {
        clearToken();
        throw new AuthError("Unauthorized");
    }
    if (!res.ok) {
        let detail = "";
        try {
            const body = await res.json();
            detail = body.error || JSON.stringify(body.details ?? body);
        } catch {
            /* ignore */
        }
        throw new Error(detail || `Request failed (${res.status})`);
    }
    return res.json();
}

export async function login(password: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
    });
    if (res.status === 401) throw new AuthError("Invalid password");
    const data = await handle(res);
    setToken(data.token);
}

export async function checkSession(): Promise<boolean> {
    if (!getToken()) return false;
    try {
        await handle(await fetch(`${API_BASE}/api/auth/me`, { headers: authHeaders() }));
        return true;
    } catch {
        return false;
    }
}

export async function getContentKey<T = unknown>(key: ContentKey): Promise<T> {
    return handle(await fetch(`${API_BASE}/api/content/${key}`));
}

export async function putContentKey(key: ContentKey, value: unknown): Promise<void> {
    await handle(
        await fetch(`${API_BASE}/api/content/${key}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", ...authHeaders() },
            body: JSON.stringify(value),
        })
    );
}

export interface MediaItem {
    id: string;
    url: string;
    original: string;
    mimetype: string;
    size: number;
    createdAt: string;
}

export async function uploadMedia(file: File): Promise<MediaItem> {
    const form = new FormData();
    form.append("file", file);
    return handle(
        await fetch(`${API_BASE}/api/media`, {
            method: "POST",
            headers: authHeaders(),
            body: form,
        })
    );
}
