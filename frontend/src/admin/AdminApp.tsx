import { useEffect, useState } from "react";
import "./admin.css";
import { checkSession } from "./admin.api";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function AdminApp() {
    const [authed, setAuthed] = useState<boolean | null>(null);

    useEffect(() => {
        checkSession().then(setAuthed);
    }, []);

    if (authed === null) {
        return <div className="admin-login"><div className="admin-muted">Loading…</div></div>;
    }

    return authed ? (
        <AdminDashboard onLogout={() => setAuthed(false)} />
    ) : (
        <AdminLogin onSuccess={() => setAuthed(true)} />
    );
}
