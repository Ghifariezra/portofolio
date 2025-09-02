import csrfInterceptor from "@/services/api/csrf/interceptor";
import type { 
    ProfileResponse, 
    ProjectBySlugResponse, 
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
    const res = await csrfInterceptor.get("/api/projects");

    return res.data;
};

export const ProjectBySlugRequest = async ({ slug }: { slug: string }): Promise<ProjectBySlugResponse> => {
    const res = await csrfInterceptor.get(`/api/projects/${slug}`);

    return res.data;
};