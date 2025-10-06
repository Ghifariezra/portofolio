import {
    ProjectRequest,
    ProjectBySlugRequest,
} from "@/services/api/projects";
import type {
    ProjectResponse,
    ProjectBySlugResponse,
} from "@/types/response/assets";
import { useQuery } from "@tanstack/react-query";

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

export const useProjectBySlugQuery = ({ slug }: { slug: string }) => {
    const query = useQuery({
        queryKey: ["project-by-slug", slug],
        queryFn: () => ProjectBySlugRequest({ slug }),
    });

    return {
        data: query.data as ProjectBySlugResponse,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};
