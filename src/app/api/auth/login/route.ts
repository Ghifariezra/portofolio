import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyCsrfToken } from "@/utilities/csrf/csrf";
import { PortfolioService } from "@/services/db";
import { verify } from "argon2";
import { generateLoginToken } from "@/utilities/auth/login";

export async function POST(req: Request) {
    const csrfToken = (await cookies()).get("csrfToken")?.value || "";
    if (!csrfToken) {
        return NextResponse.json({ error: "Missing CSRF token" }, { status: 403 });
    }

    const valid = await verifyCsrfToken(csrfToken);
    if (!valid) {
        return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
    }

    const { username, password } = await req.json();

    const storage = new PortfolioService();
    const data = await storage.getUsers(username);

    if (!data) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValid = await verify(data.password, password);
    if (!isValid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const payload = {
        username: data.username,
        role: data.role,
    };

    const token = await generateLoginToken(payload);

    (await cookies()).set("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ message: "Login successful" });
}
