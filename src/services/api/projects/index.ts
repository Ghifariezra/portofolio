import { AxiosInstance } from "axios";
import csrfInterceptor from "@/services/api/csrf/interceptor";
import type {
    ProjectBySlugResponse,
    ProjectResponse,
    ProjectContract
} from "@/types/response/assets"; 

export default class ProjectService implements ProjectContract {
    private instance: AxiosInstance = csrfInterceptor;
    async getProjects(): Promise<ProjectResponse> {
        const res = await this.instance.get("/api/projects");
        return res.data;
    }

    async getProjectBySlug(slug: string): Promise<ProjectBySlugResponse> {
        const res = await this.instance.get(`/api/projects/${slug}`);
        return res.data;
    }
}