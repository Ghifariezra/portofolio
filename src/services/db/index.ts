import { toBase64 } from "@/utilities/base64/base64";
import { supabase } from "@/utilities/supabase/client";
import { randomUUID } from "crypto";
import type { FormSchemaProjectUpdate } from "@/types/form/project";
import type { FormSchemaBlogUpdate } from "@/types/form/blogs";

export class PortfolioService {
    private client;
    private bucket = "Portofolio";
    private expiresIn = 60 * 60 * 24 * 365;

    constructor() {
        this.client = supabase;
    }

    // ambil daftar file di folder tertentu
    async listFiles(folder: string) {
        const { data, error } = await this.client
            .storage
            .from(this.bucket)
            .list(folder);

        if (error) throw new Error(error.message);

        return data;
    }

    // generate signed URL untuk 1 file
    async getSignedUrl(path: string) {
        const { data, error } = await this.client
            .storage
            .from(this.bucket)
            .createSignedUrl(path, this.expiresIn);

        if (error) throw new Error(error.message);

        return data?.signedUrl ?? null;
    }

    // ambil semua file dengan signed URL
    async getFilesWithSignedUrl(folder: string) {
        const files = await this.listFiles(folder);

        const signedUrls = await Promise.all(
            files.map(async (file) => {
                const url = await this.getSignedUrl(`${folder}/${file.name}`);
                return {
                    name: file.name.split(".")[0],
                    url: url,
                    blurData: await toBase64(url),
                };
            })
        );

        return signedUrls;
    }

    async uploadImage(file: File, folder: string): Promise<string> {
        if (!file) throw new Error("No file provided");

        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = file.name.split(".").pop();
        const fileName = `${randomUUID()}.${ext}`;
        const filePath = `${folder}/${fileName}`;

        const { error } = await this.client.storage
            .from(this.bucket)
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (error) throw new Error(`Upload failed: ${error.message}`);

        // 🧠 karena bucket private, kita hanya return path, bukan URL
        return filePath;
    }

    // Project
    async getProjects() {
        const { data, error } = await this.client
            .from("projects")
            .select("*");

        if (error) throw new Error(error.message);

        const signedUrls = await Promise.all(
            data.map(async (project) => {
                const url = await this.getSignedUrl(project.image);
                const blurDataUrl = await toBase64(url);
                return {
                    ...project,
                    image: url,
                    blurData: blurDataUrl
                };
            })
        );

        return signedUrls;
    }

    async getProjectBySlug(slug: string) {
        const { data, error } = await this.client
            .from("projects")
            .select("*")
            .eq("slug", slug)
            .maybeSingle();

        if (error) throw new Error(error.message);

        if (!data) return null;

        const url = await this.getSignedUrl(data.image);
        const blurDataUrl = await toBase64(url);

        return { ...data, imageUrl: url, blurData: blurDataUrl };
    }

    async getUsers(username: string) {
        const { data, error } = await this.client
            .from("users")
            .select("*")
            .eq("username", username)
            .single();

        if (error) throw new Error(error.message);

        return data;
    }

    async createProject(data: FormSchemaProjectUpdate) {
        let imagePath: string | null = null;

        if (data.image instanceof File) {
            imagePath = await this.uploadImage(data.image, "projects");
        }

        const payload = {
            user_id: data.user_id,
            title: data.title,
            description: data.description,
            slug: data.slug,
            demo: data.demo,
            status: data.status,
            category: data.category,
            partner_team: data.partner_team,
            partner_social_media: data.partner_social_media,
            image: imagePath,
        };

        const { error } = await this.client.from("projects").insert(payload);

        if (error) throw new Error(`DB insert failed: ${error.message}`);

        return "✅ Project created successfully";
    }

    async deleteProject(id: string, user_id: string) {
        const { error } = await this.client
            .from("projects")
            .delete()
            .eq("uuid", id)
            .eq("user_id", user_id);

        if (error) throw new Error(`DB delete failed: ${error.message}`);

        return "✅ Project deleted successfully";
    }

    // Blogs
    async getBlogs() {
        const { data, error } = await this.client
            .from("blogs")
            .select("*");

        if (error) throw new Error(error.message);

        const signedUrls = await Promise.all(
            data.map(async (blog) => {
                const url = await this.getSignedUrl(blog.image);
                const blurDataUrl = await toBase64(url);
                return {
                    ...blog,
                    image: url,
                    blurData: blurDataUrl
                };
            })
        );

        return signedUrls;
    }

    async getBlogBySlug(slug: string) {
        const { data, error } = await this.client
            .from("blogs")
            .select("*")
            .eq("slug", slug)
            .maybeSingle();

        if (error) throw new Error(error.message);

        if (!data) return null;

        const url = await this.getSignedUrl(data.image);
        const blurDataUrl = await toBase64(url);

        return { ...data, image: url, blurData: blurDataUrl };
    }

    async createBlog(data: FormSchemaBlogUpdate) {
        let imagePath: string | null = null;

        if (data.image instanceof File) {
            imagePath = await this.uploadImage(data.image, "blogs");
        }

        const payload = {
            user_id: data.user_id,
            title: data.title,
            description: data.description,
            slug: data.slug,
            language: data.language,
            content: data.content,
            image: imagePath,
        };

        const { error } = await this.client.from("blogs").insert(payload);

        if (error) throw new Error(`DB insert failed: ${error.message}`);

        return "✅ Blog created successfully";
    }
}
