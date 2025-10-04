import { AxiosError } from "axios";
import csrfInterceptor from "@/services/api/csrf/interceptor";
import type { FormSchemaProject } from "@/types/form/project";

export const PostRequestProject = async (data: FormSchemaProject) => {
    try {
        const formData = new FormData();
        const appendSafe = (key: string, value?: string) => {
            if (value !== undefined) formData.append(key, value);
        };

        for (const [key, value] of Object.entries(data)) {
            if (typeof value === "string") {
                appendSafe(key, value);
            } else if (Array.isArray(value)) {
                // 🚀 stringify array sebelum append
                formData.append(key, JSON.stringify(value));
            } else if (value instanceof File) {
                formData.append(key, value);
            }
        }

        const res = await csrfInterceptor.post(`/api/auth/post/project`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return { status: res.status, data: res.data };
    } catch (err) {
        if (err instanceof AxiosError) {
            return { status: err.response?.status ?? 500, data: null };
        }
        throw err;
    }
};

export const DeleteRequestProject = async (id: string, user_id: string) => {
    try {
        const res = await csrfInterceptor.delete(
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
};