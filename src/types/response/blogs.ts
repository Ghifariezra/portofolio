export interface BlogsItems {
    uuid: string;
    user_id: string;
    title: string;
    language: string;
    description: string;
    content: string;
    image: string;
    blurData: string;
    slug: string;
    publish_date: string;
    updated_at: string;
} 

export type BlogsResponse = BlogsItems[];
export interface BlogsContract {
    getBlogs: () => Promise<BlogsResponse>;
    getBlogBySlug: (slug: string) => Promise<BlogsItems | null>;
}