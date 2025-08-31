import {
    ProfileRequest,
    SkillsRequest,
    SocialRequest,
    ProjectRequest
} from "@/services/api/storage/assets";
import type {
    SkillsResponse,
    SocialsResponse,
    ProfileResponse,
    ProjectResponse
} from "@/types/response/assets";
import { useQuery } from "@tanstack/react-query";

export const useProfileQuery = () => {
    const query = useQuery({
        queryKey: ["profile"],
        queryFn: ProfileRequest,
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
        queryFn: SkillsRequest,
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
        queryFn: SocialRequest,
    });

    return {
        data: query.data as SocialsResponse,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};

export const useProjectQuery = () => {
    const query = useQuery({
        queryKey: ["projects"],
        queryFn: ProjectRequest,
    });

    return {
        data: query.data as ProjectResponse,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};
