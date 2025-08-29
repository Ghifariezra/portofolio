import csrfInterceptor from "@/services/api/csrf/interceptor";
import type { ProfileResponse, SkillsResponse, SocialsResponse } from "@/types/response/assets";

export const ProfileRequest = async (): Promise<ProfileResponse> => {
    const payload = { folder: "profile" };

    const res = await csrfInterceptor.post("/api/assets", payload, {
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
};

export const SkillsRequest = async (): Promise<SkillsResponse> => {
    const payload = { folder: "skills" };

    const res = await csrfInterceptor.post("/api/assets", payload, {
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
};

export const SocialRequest = async (): Promise<SocialsResponse> => {
    const payload = { folder: "social-media" };

    const res = await csrfInterceptor.post("/api/assets", payload, {
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
};
