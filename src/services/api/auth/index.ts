import { AxiosError, AxiosInstance } from "axios";
import csrfInterceptor from "@/services/api/csrf/interceptor";
import { FormSchemaProject } from "@/types/form/project";
import { FormSchemaBlog } from "@/types/form/blogs";

export default class AdminService {
    private instance: AxiosInstance = csrfInterceptor;
    private buildFormData(type: "project" | "blog", data: FormSchemaBlog | FormSchemaProject) {
        const formData = new FormData();

        const appendSafe = (key: string, value?: string) => {
            if (value !== undefined) formData.append(key, value);
        };

        switch (type) {
            case "project":
                for (const [key, value] of Object.entries(data)) {
                    if (typeof value === "string") {
                        appendSafe(key, value);
                    } else if (Array.isArray(value)) {
                        formData.append(key, JSON.stringify(value));
                    } else if (value instanceof File) {
                        formData.append(key, value);
                    }
                }
                break;
            case "blog":
                for (const [key, value] of Object.entries(data)) {
                    if (typeof value === "string") {
                        appendSafe(key, value);
                    } else if (value instanceof File) {
                        formData.append(key, value);
                    }
                }
                break;
        }

        return formData;
    }

    async Me() {
        try {
            const res = await this.instance.get("/api/me");
            return res.data;
        } catch (err) {
            if (err instanceof AxiosError && err.response?.status === 401) {
                return null;
            }
            throw err;
        }
    }

    async Login({ username, password }: { username: string, password: string }) {
        try {
            const res = await this.instance.post("/api/auth/login", { username, password });

            return res.data;
        } catch (err) {
            if (err instanceof AxiosError && err.response?.status === 401) {
                return null;
            }
            throw err;
        }
    }

    async Logout() {
        const res = await this.instance.post("/api/auth/logout");
        return res.data;
    }

    async PostProject(data: FormSchemaProject) {
        try {
            const formData = this.buildFormData("project", data);

            const res = await this.instance.post(`/api/auth/post/project`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            return { status: res.status, data: res.data };
        } catch (err) {
            if (err instanceof AxiosError) {
                return { status: err.response?.status ?? 500, data: null };
            }
            throw err;
        }
    }

    async DeleteProject(id: string, user_id: string) {
        try {
            const res = await this.instance.delete(
                `/api/auth/delete/project/${id}`,
                { params: { user_id } }
            );
            return { status: res.status }
        } catch (err) {
            if (err instanceof AxiosError) {
                return { status: err.response?.status ?? 500, data: null }
            }
            throw err;
        }
    }

    async PostBlog(data: FormSchemaBlog) {
        try {
            const formData = this.buildFormData("blog", data);

            const res = await csrfInterceptor.post(`/api/auth/post/blog`, formData);
            return { status: res.status, data: res.data };
        } catch (err) {
            if (err instanceof AxiosError) {
                return { status: err.response?.status ?? 500, data: null };
            }
            throw err;
        }
    }
}