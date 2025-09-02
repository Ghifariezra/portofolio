"use client";
import { HomeProvider } from "@/app/_components/providers/home-provider";
import Header from "@/app/_components/templates/header";
import Footer from "@/app/_components/templates/footer";
import Sot from "@/app/_components/ui/sot/sot";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<HomeProvider>
			<Header />
			{children}
			<Footer />
			<Sot />
		</HomeProvider>
	);
}
