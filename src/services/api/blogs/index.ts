import csrfInterceptor from "@/services/api/csrf/interceptor";
import type { BlogsResponse, BlogsItems, BlogsContract } from "@/types/response/blogs"; 

export default class BlogService implements BlogsContract {
    async getBlogs(): Promise<BlogsResponse> {
        const res = await csrfInterceptor.get("/api/blogs");
        return res.status === 404 ? [] : res.data;
    }

    async getBlogBySlug(slug: string): Promise<BlogsItems | null> {
        const res = await csrfInterceptor.get(`/api/blogs/${slug}`);
        return res.status === 404 ? null : res.data;
    }
}
