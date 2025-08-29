import { supabase } from "@/utilities/supabase/client";

export class StorageService {
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
                    url,
                };
            })
        );

        return signedUrls;
    }
}
