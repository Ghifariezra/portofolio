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
    created_at: string;
    updated_at: string;
}

export type BlogsResponse = BlogsItems[];