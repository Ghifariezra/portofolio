import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyCsrfToken } from "@/utilities/csrf/csrf";
import { PortfolioService } from "@/services/db";

export async function GET() {
    const csrfToken = (await cookies()).get("csrfToken")?.value || "";

    if (!csrfToken) {
        return NextResponse.json({ error: "Missing CSRF token" }, { status: 403 });
    }

    const valid = await verifyCsrfToken(csrfToken);

    if (!valid) {
        return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
    }

    const storage = await new PortfolioService();
    const data = await storage.getProjects();

    return NextResponse.json({ projects: data });
}