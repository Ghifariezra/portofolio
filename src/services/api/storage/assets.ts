import csrfInterceptor from "@/services/api/csrf/interceptor";
import type { 
    ProfileResponse, 
    ProjectResponse, 
    SkillsResponse, 
    SocialsResponse 
} from "@/types/response/assets";

export const ProfileRequest = async (): Promise<ProfileResponse> => {
    const res = await csrfInterceptor.get("/api/assets", {
        params: { folder: "profile" },
    });

    return res.data;
};

export const SkillsRequest = async (): Promise<SkillsResponse> => {
    const res = await csrfInterceptor.get("/api/assets", {
        params: { folder: "skills" },
    });

    return res.data;
};

export const SocialRequest = async (): Promise<SocialsResponse> => {
    const res = await csrfInterceptor.get("/api/assets", {
        params: { folder: "social-media" },
    });

    return res.data;
};

export const ProjectRequest = async (): Promise<ProjectResponse> => {
    const res = await csrfInterceptor.get("/api/assets", {
        params: { folder: "projects" },
    });

    return res.data;
};
