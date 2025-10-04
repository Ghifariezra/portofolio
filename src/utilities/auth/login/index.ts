import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function generateLoginToken(payload: { username: string; role: string }) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30m")
        .sign(secret);
}

export async function verifyLoginToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);

        return payload as { 
            username: string; 
            role: string; 
            iat: number; 
            exp: number
         };
    } catch {
        return null;
    }
}
