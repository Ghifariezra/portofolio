"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { ChildrenProps } from "@/types/props/children";
import { useState } from "react";

export default function QueryProvider({ children }: Readonly<ChildrenProps>) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}
