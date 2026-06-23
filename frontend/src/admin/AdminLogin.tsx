import { useState } from "react";
import { AuthError, login } from "./admin.api";

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setBusy(true);
        setError(null);
        try {
            await login(password);
            onSuccess();
        } catch (err) {
            setError(err instanceof AuthError ? "Invalid password" : "Login failed — is the backend running?");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="admin-login">
            <form className="admin-login-card" onSubmit={submit}>
                <h1>TCG Awards — Admin</h1>
                <p className="admin-muted">Enter the admin password to manage site content.</p>
                <input
                    className="admin-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    autoFocus
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <span className="admin-error-text">{error}</span>}
                <button className="admin-btn" type="submit" disabled={busy || !password}>
                    {busy ? "Signing in…" : "Sign in"}
                </button>
            </form>
        </div>
    );
}
