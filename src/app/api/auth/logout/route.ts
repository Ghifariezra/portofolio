import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyCsrfToken } from "@/utilities/csrf/csrf";

export async function POST() {
    const csrfToken = (await cookies()).get("csrfToken")?.value || "";

    if (!csrfToken) {
        return NextResponse.json({ error: "Missing CSRF token" }, { status: 403 });
    }

    const valid = await verifyCsrfToken(csrfToken);

    if (!valid) {
        return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
    }

    // Hapus cookie authToken
    (await cookies()).set("authToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        path: "/",
        maxAge: 0,
    });

    return NextResponse.json({ message: "Logout successful" });
}
