import {
    useMutation,
    // useQueryClient
} from "@tanstack/react-query";
import { 
    PostRequestProject
} from "@/services/api/auth/post";
import type { FormSchemaProject } from "@/types/form/project";

export const usePostProject = () => {
    // const qC = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: FormSchemaProject) => PostRequestProject(data),
        // onSuccess: () => {
        //     qC.invalidateQueries({ queryKey: ["projects"] });
        // }
    })

    return {
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        mutate: mutation.mutateAsync
    };
};