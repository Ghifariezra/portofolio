import csrfInterceptor from "@/services/api/csrf/interceptor";
import { BlogsResponse, BlogsItems } from "@/types/response/blogs";

export const BlogsRequest = async (): Promise<BlogsResponse> => {
    const res = await csrfInterceptor.get("/api/blogs");

    if (res.status === 404) return [];

    return res.data;
};

export const BlogBySlugRequest = async ({ slug }: { slug: string }): Promise<BlogsItems | null> => {
    const res = await csrfInterceptor.get(`/api/blogs/${slug}`);

    if (res.status === 404) return null;

    return res.data;
};