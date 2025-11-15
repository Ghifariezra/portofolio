import { AxiosInstance } from "axios";
import csrfInterceptor from "@/services/api/csrf/interceptor";
import type {
    CertificatesResponse,
    ProfileResponse,
    SkillsResponse,
    SocialsResponse,
    AssetsContract
} from "@/types/response/assets";

export default class AssetsService implements AssetsContract {
    private instance: AxiosInstance = csrfInterceptor;

    async getProfile(): Promise<ProfileResponse> {
        const res = await this.instance.get("/api/assets", {
            params: { folder: "profile" },
        });

        return res.data;
    }

    async getSkills(): Promise<SkillsResponse> {
        const res = await this.instance.get("/api/assets", {
            params: { folder: "skills" },
        });

        return res.data;
    }

    async getSocials(): Promise<SocialsResponse> {
        const res = await this.instance.get("/api/assets", {
            params: { folder: "social-media" },
        });

        return res.data;
    }

    async getCertificates(): Promise<CertificatesResponse> {
        const res = await this.instance.get("/api/assets", {
            params: { folder: "certificates" },
        });

        return res.data;
    }
}
