import AssetsService from "@/services/api/storage/assets";
import { useQuery } from "@tanstack/react-query";
import type {
    SkillsResponse,
    SocialsResponse,
    ProfileResponse,
    CertificatesResponse
} from "@/types/response/assets"; 

const assetsService = new AssetsService();

export const useProfileQuery = () => {
    const query = useQuery({
        queryKey: ["profile"],
        queryFn: async () => await assetsService.getProfile(),
    });

    return {
        data: query.data as ProfileResponse,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};

export const useSkillsQuery = () => {
    const query = useQuery({
        queryKey: ["skills"],
        queryFn: async () => await assetsService.getSkills(),
    });

    return {
        data: query.data as SkillsResponse,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};

export const useSocialQuery = () => {
    const query = useQuery({
        queryKey: ["social-media"],
        queryFn: async () => await assetsService.getSocials(),
    });

    return {
        data: query.data as SocialsResponse,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};

export const useCertificatesQuery = () => {
    const query = useQuery({
        queryKey: ["certificates"],
        queryFn: async () => await assetsService.getCertificates(),
    });

    return {
        data: query.data as CertificatesResponse,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};