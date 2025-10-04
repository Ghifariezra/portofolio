// src/app/api/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyLoginToken } from "@/utilities/auth/login";
import { verifyCsrfToken } from "@/utilities/csrf/csrf";

export async function GET() {
    const csrfToken = (await cookies()).get("csrfToken")?.value || "";

    if (!csrfToken) {
        return NextResponse.json({ error: "Missing CSRF token" }, { status: 403 });
    }

    const valid = await verifyCsrfToken(csrfToken);

    if (!valid) {
        return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
    }

    const token = (await cookies()).get("authToken")?.value;
    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
        const payload = await verifyLoginToken(token);
        return NextResponse.json({ authenticated: true, user: payload });
    } catch {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
