"use client";
import Navbar from "@/app/components/common/navbar/navbar";
import { useMenu } from "@/hooks/useMenu";

export default function Header() {
	const { scrolled } = useMenu();
	return (
		<header
			className={`block py-6 px-6 fixed top-0 left-0 w-full z-50 ${
				scrolled
					? ""
					: "border-b border-slate-700/10 dark:border-slate-100/10"
			}`}>
			<Navbar />
		</header>
	);
}
