import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyCsrfToken } from "@/utilities/csrf/csrf";
import { StorageService } from "@/services/db/storage";

export async function POST(req: NextRequest) {
    const csrfToken = (await cookies()).get("csrfToken")?.value || "";

    if (!csrfToken) {
        return NextResponse.json({ error: "Missing CSRF token" }, { status: 403 });
    }

    const valid = await verifyCsrfToken(csrfToken);

    if (!valid) {
        return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
    }

    const storage = await new StorageService();
    const { folder } = await req.json();

    if (!folder) {
        return NextResponse.json({ error: "Missing profile or skills" }, { status: 400 });
    }

    const data = await storage.getFilesWithSignedUrl(folder);

    return NextResponse.json({
        assets: {
            [folder]: data
        }
    });
}