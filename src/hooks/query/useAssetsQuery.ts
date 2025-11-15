import AssetsService from "@/services/api/storage/assets";
import { Query } from "@/utilities/tanstack/Query";

export default class AssetsQueries extends AssetsService {
    useProfileQuery() {
        return Query("profile", () => this.getProfile());
    }

    useSkillsQuery() {
        return Query("skills", () => this.getSkills());
    }

    useSocialQuery() {
        return Query("socials", () => this.getSocials());
    }

    useCertificatesQuery() {
        return Query("certificates", () => this.getCertificates());
    }
};