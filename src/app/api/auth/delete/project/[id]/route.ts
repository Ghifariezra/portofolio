import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PortfolioService } from "@/services/db";
import { verifyLoginToken } from "@/utilities/auth/login";
import { verifyCsrfToken } from "@/utilities/csrf/csrf";
import type { IdProps } from "@/types/props/slug";

export async function DELETE(req: Request, { params }: IdProps) {
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

    const user = await verifyLoginToken(token);

    if (!user) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const id = (await params).id;

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
        return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
    }

    const storage = new PortfolioService();
    const data = await storage.deleteProject(id, user_id);

    return NextResponse.json({
        message: data
    }, { status: 200 });
}