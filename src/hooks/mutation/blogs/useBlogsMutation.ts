import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query"; 
import AdminService from "@/services/api/auth";
import type { FormSchemaBlog } from "@/types/form/blogs";

const adminService = new AdminService();

export const usePostBlog = () => {
    const qC = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: FormSchemaBlog) => adminService.PostBlog(data),
        onSuccess: () => {
            qC.invalidateQueries({ queryKey: ["blogs"] });
            qC.invalidateQueries({ queryKey: ["blog-by-slug"] });
        }
    })

    return {
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        mutate: mutation.mutateAsync
    };
};

// export const useDeleteProject = () => {
//     const qC = useQueryClient();

//     const mutation = useMutation({
//         mutationFn: async ({
//             id,
//             user_id
//         }: { id: string; user_id: string }) => DeleteRequestProject(id, user_id),
//         onSuccess: () => {
//             qC.invalidateQueries({ queryKey: ["projects"] });
//         }
//     })

//     return {
//         isLoading: mutation.isPending,
//         isError: mutation.isError,
//         error: mutation.error,
//         mutate: mutation.mutateAsync
//     };
// };
