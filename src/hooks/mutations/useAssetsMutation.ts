import { ProfileRequest, SkillsRequest, SocialRequest } from "@/services/api/storage/assets";
import { useMutation } from "@tanstack/react-query";

export const useProfileMutation = () => {
    const mutation = useMutation({
        mutationFn: ProfileRequest,
    })

    return {
        mutate: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    }
};

export const useSkillsMutation = () => {
    const mutation = useMutation({
        mutationFn: SkillsRequest,
    })

    return {
        mutate: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    }
};

export const useSocialMutation = () => {
    const mutation = useMutation({
        mutationFn: SocialRequest
    })

    return {
        mutate: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    }
};