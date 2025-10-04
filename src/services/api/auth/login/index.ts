import { AxiosError } from "axios";
import csrfInterceptor from "@/services/api/csrf/interceptor";

export const LoginRequest = async ({ username, password }: { username: string, password: string }) => {
    const res = await csrfInterceptor.post("/api/auth/login", { username, password });

    return res.data;
};

export const MeRequest = async () => {
    try {
        const res = await csrfInterceptor.get("/api/me");

        if (res.status === 200 && res.data.authenticated) {
            return res.data;
        }

        return null;
    } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
            return null;
        }
        throw err;
    }
};

export const LogoutRequest = async () => {
    const res = await csrfInterceptor.post("/api/auth/logout");
    return res.data;
};