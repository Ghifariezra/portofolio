import { toBase64 } from "@/utilities/base64/base64";
import { supabase } from "@/utilities/supabase/client";

export class PortfolioService {
    private client;
    private bucket = "Portofolio";
    private expiresIn = 60 * 60 * 24 * 365; // 1 tahun

    constructor() {
        this.client = supabase();
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
                return { ...project, image: url, blurData: blurDataUrl };
            })
        );

        return signedUrls;
    }

    async getProjectBySlug(slug: string) {
        const { data, error } = await this.client
            .from("projects")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error) throw new Error(error.message);

        if (!data) return null;

        const url = await this.getSignedUrl(data.image);
        const blurDataUrl = await toBase64(url);

        return { ...data, image: url, blurData: blurDataUrl };
    }
}
