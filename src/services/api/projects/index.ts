import csrfInterceptor from "@/services/api/csrf/interceptor";
import type {
    ProjectBySlugResponse,
    ProjectResponse,
} from "@/types/response/assets";

export const ProjectRequest = async (): Promise<ProjectResponse> => {
    const res = await csrfInterceptor.get("/api/projects");

    return res.data;
};

export const ProjectBySlugRequest = async ({ slug }: { slug: string }): Promise<ProjectBySlugResponse> => {
    const res = await csrfInterceptor.get(`/api/projects/${slug}`);

    return res.data;
};
