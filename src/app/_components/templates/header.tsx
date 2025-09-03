"use client";
import Navbar from "@/app/_components/common/navbar/navbar";
import { memo } from "react";
import { useMenu } from "@/hooks/useMenu";
import { Toaster } from "sonner";

function Header() {
	const { scrolled } = useMenu();
	return (
		<header
			className={`block py-6 px-6 fixed top-0 left-0 w-full z-50 ${
				scrolled ? "" : "border-b border-glassess"
			}`}>
			<Navbar />
			<Toaster position="top-center" />
		</header>
	);
}

export default memo(Header);
