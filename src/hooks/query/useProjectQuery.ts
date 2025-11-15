import { useQuery } from "@tanstack/react-query";
import ProjectService from "@/services/api/projects";
import type {
    ProjectResponse,
    ProjectBySlugResponse,
} from "@/types/response/assets";

const projectService = new ProjectService();

export const useProjectQuery = () => {
    const query = useQuery({
        queryKey: ["projects"],
        queryFn: async () => await projectService.getProjects(),
    });

    return {
        data: query.data as ProjectResponse,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};

export const useProjectBySlugQuery = ({ slug }: { slug: string }) => {
    const query = useQuery({
        queryKey: ["project-by-slug", slug],
        queryFn: async () => await projectService.getProjectBySlug(slug),
    });

    return {
        data: query.data as ProjectBySlugResponse,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};
