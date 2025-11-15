import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import AdminService from "@/services/api/auth";
import type { FormSchemaProject } from "@/types/form/project";

const adminService = new AdminService();

export const usePostProject = () => {
    const qC = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: FormSchemaProject) => adminService.PostProject(data),
        onSuccess: () => {
            qC.invalidateQueries({ queryKey: ["projects"] });
            qC.invalidateQueries({ queryKey: ["project-by-slug"] });
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
        }: { id: string; user_id: string }) => adminService.DeleteProject(id, user_id),
        onSuccess: () => {
            qC.invalidateQueries({ queryKey: ["projects"] });
            qC.invalidateQueries({ queryKey: ["project-by-slug"] });
        }
    })

    return {
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        mutate: mutation.mutateAsync
    };
};
