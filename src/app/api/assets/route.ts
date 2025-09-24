import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyCsrfToken } from "@/utilities/csrf/csrf";
import { PortfolioService } from "@/services/db";

export async function GET(req: NextRequest) {
    const csrfToken = (await cookies()).get("csrfToken")?.value || "";

    if (!csrfToken) {
        return NextResponse.json({ error: "Missing CSRF token" }, { status: 403 });
    }

    const valid = await verifyCsrfToken(csrfToken);

    if (!valid) {
        return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
    }

    const storage = await new PortfolioService();
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder");

    if (!folder) {
        return NextResponse.json({ error: "Missing folder" }, { status: 400 });
    }

    const data = await storage.getFilesWithSignedUrl(folder);

    return NextResponse.json({
        assets: {
            [folder]: data
        }
    });
}