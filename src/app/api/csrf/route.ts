import { NextResponse } from "next/server";
import { generateCsrfToken } from "@/utilities/csrf/csrf";

export async function GET() {
    const token = await generateCsrfToken();

    const res = NextResponse.json({ message: "CSRF token set" });
    
    res.cookies.set("csrfToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        path: "/",
    });

    return res;
}