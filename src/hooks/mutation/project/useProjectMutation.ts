import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { 
    PostRequestProject,
    DeleteRequestProject
} from "@/services/api/auth/post";
import type { FormSchemaProject } from "@/types/form/project";

export const usePostProject = () => {
    const qC = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: FormSchemaProject) => PostRequestProject(data),
        onSuccess: () => {
            qC.invalidateQueries({ queryKey: ["projects"] });
        }
    })

    return {
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        mutate: mutation.mutateAsync
    };
};

export const useDeleteProject = () => {
    const qC = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({
            id,
            user_id
        }: { id: string; user_id: string }) => DeleteRequestProject(id, user_id),
        onSuccess: () => {
            qC.invalidateQueries({ queryKey: ["projects"] });
        }
    })

    return {
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        mutate: mutation.mutateAsync
    };
};
