import { useMemo } from "react";
import BlogsQueries from "@/hooks/query/useBlogsQuery";

export const useBlogBySlug = (slug: string) => {
    const blogsQueries = useMemo(() => new BlogsQueries(), []);
    const { data, isLoading, isError } = blogsQueries.useBlogBySlugQuery({ slug });

    return {
        data,
        isLoading,
        isError,
    };
};
