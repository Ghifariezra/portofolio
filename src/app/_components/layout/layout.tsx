"use client";
import { HomeProvider } from "@/app/_components/providers/home-provider";
import Header from "@/app/_components/templates/header";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<HomeProvider>
			<Header />
			{children}
		</HomeProvider>
	);
}
