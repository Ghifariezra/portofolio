import { useQuery } from "@tanstack/react-query";
import { 
    BlogsRequest,
    BlogBySlugRequest
 } from "@/services/api/blogs";
import type { BlogsResponse, BlogsItems } from "@/types/response/blogs";

export const useBlogsQuery = () => {
    const query = useQuery({
        queryKey: ["blogs"],
        queryFn: BlogsRequest,
    });

    return {
        data: query.data as BlogsResponse,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};

export const useBlogBySlugQuery = ({ slug }: { slug: string }) => {
    const query = useQuery({
        queryKey: ["blog-by-slug", slug],
        queryFn: () => BlogBySlugRequest({ slug }),
    });

    return {
        data: query.data as BlogsItems,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    }
};