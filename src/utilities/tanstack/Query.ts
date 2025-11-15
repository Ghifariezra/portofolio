import { 
    useQueryClient,
    useQuery, 
    useMutation,
    type QueryFunction,
    type MutationFunction
 } from "@tanstack/react-query";

export function Query<T>(key: string, queryFn: QueryFunction<T>, slug?: string) {
    const query = useQuery({
        queryKey: slug ? [key, slug] : [key],
        queryFn: queryFn,
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
}

export function Mutation<TData, TVariables>(key: string[], mutationFn: MutationFunction<TData, TVariables>) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: mutationFn,
        onSuccess: () => {
            key.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
        }
    });

    return {
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        mutate: mutation.mutateAsync
    };
}