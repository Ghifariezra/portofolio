import { SignJWT, jwtVerify } from "jose";
import crypto from "crypto";

const secret = new TextEncoder().encode(process.env.CSRF_SECRET || crypto.randomBytes(32).toString("hex"));

export async function generateCsrfToken() {
    const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("15m")
        .sign(secret);

    return token;
}

export async function verifyCsrfToken(token: string) {
    try {
        await jwtVerify(token, secret);
        return true;
    } catch {
        return false;
    }
}
