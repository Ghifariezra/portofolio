import AdminService from "@/services/api/auth";
import BlogService from "@/services/api/blogs";
import { Query, Mutation } from "@/utilities/tanstack/Query";
import type { FormSchemaBlog, BlogSlug, DeleteBlog } from "@/types/form/blogs";

export default class BlogsQueries extends BlogService {
    private adminService = new AdminService();

    useBlogsQuery() {
        return Query("blogs", this.getBlogs);
    };

    useBlogBySlugQuery({ slug }: BlogSlug) {
        return Query("blog-by-slug", () => this.getBlogBySlug(slug), slug);
    };

    usePostBlog() {
        return Mutation(["blogs", "blog-by-slug"], (data: FormSchemaBlog) => this.adminService.PostBlog(data));
    };

    useDeleteBlog() {
        return Mutation(["blogs", "blog-by-slug"], ({ id, user_id }: DeleteBlog) => this.adminService.DeleteProject(id, user_id));
    };
}