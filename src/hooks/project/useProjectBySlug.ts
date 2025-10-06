import { useProjectBySlugQuery } from "@/hooks/query/useProjectQuery";

export const useProjectBySlug = (slug: string) => {
    const { data, isLoading, isError } = useProjectBySlugQuery({ slug });

    return {
        data,
        isLoading,
        isError,
    };
};
