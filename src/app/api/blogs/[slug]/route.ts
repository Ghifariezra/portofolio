import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyCsrfToken } from "@/utilities/csrf/csrf";
import { PortfolioService } from "@/services/db";
import type { SlugProps } from "@/types/props/slug";

export async function GET(
    req: Request,
    { params }: SlugProps
) {
    const csrfToken = (await cookies()).get("csrfToken")?.value || "";

    if (!csrfToken) {
        return NextResponse.json({ error: "Missing CSRF token" }, { status: 404 });
    }

    const valid = await verifyCsrfToken(csrfToken);
    if (!valid) {
        return NextResponse.json({ error: "Invalid CSRF token" }, { status: 404 });
    }

    const slug = (await params).slug;
    const storage = new PortfolioService();
    const data = await storage.getBlogBySlug(slug);

    return NextResponse.json(data);
}
