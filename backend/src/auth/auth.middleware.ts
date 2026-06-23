import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "insecure-dev-secret";

export function signToken(): string {
    return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): boolean {
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token || !verifyToken(token)) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    next();
}
