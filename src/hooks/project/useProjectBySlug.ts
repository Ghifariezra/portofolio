import ProjectQueries from "@/hooks/query/useProjectQuery";
import { useMemo } from "react";

export const useProjectBySlug = (slug: string) => {
    const projectQueries = useMemo(() => new ProjectQueries(), []);
    const { data, isLoading, isError } = projectQueries.useProjectBySlugQuery({ slug });

    return {
        data,
        isLoading,
        isError,
    };
};
