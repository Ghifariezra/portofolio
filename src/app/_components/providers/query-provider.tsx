"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { ChildrenProps } from "@/types/props/children";
import { useState, useEffect } from "react";
import { CsrfRequest } from "@/services/api/csrf/index";

export default function QueryProvider({ children }: Readonly<ChildrenProps>) {
	const [queryClient] = useState(() => new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnMount: false,
				refetchOnReconnect: false,
				refetchOnWindowFocus: false,
			},
		}
	}));

	useEffect(() => {
		CsrfRequest();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}
