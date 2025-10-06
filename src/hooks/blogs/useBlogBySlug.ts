import { useBlogBySlugQuery } from "@/hooks/query/useBlogsQuery";

export const useBlogBySlug = (slug: string) => {
    const { data, isLoading, isError } = useBlogBySlugQuery({ slug });

    return {
        data,
        isLoading,
        isError,
    };
};
