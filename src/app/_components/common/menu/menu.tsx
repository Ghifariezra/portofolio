"use client";
import { Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMenu } from "@/hooks/useMenu";
import Link from "next/link";
import ContactButton from "@/app/_components/ui/buttons/contact";
import { useAuthContext } from "@/app/_components/providers/auth-providers";
import { usePathname } from "next/navigation";
import type { ClassNameProps } from "@/types/props/className";
import { Button } from "../../ui/button";

const pathAuth = [
	"/dashboard",
	"/dashboard/projects",
	"/dashboard/blogs",
]

export function Menu({ className }: ClassNameProps) {
	const pathname = usePathname();
	const { payload, menuItemsAuth, logout } = useAuthContext();
	const { containerMotion, itemMotion, menuItems } = useMenu();

	return (
		<motion.ul
			variants={containerMotion}
			initial="hidden"
			animate="visible"
			exit="hidden"
			className={`${className} items-center gap-6`}>
			<AnimatePresence mode="sync" initial={true}>
				{pathAuth.includes(pathname) && payload?.authenticated
					? menuItemsAuth.map((item, index) => (
							<Fragment key={index}>
								{item.name !== "Logout" ? (
									<motion.li
										key={index}
										variants={itemMotion}
										className="md:hover:border-b md:hover:border-slate-700 md:dark:hover:border-slate-100 font-semibold">
										<Link
											href={item.href}>
											{item.name}
										</Link>
									</motion.li>
								) : (
									<Button
										variant={"destructive"}
										className="px-8"
										onClick={logout}
										asChild>
										<Link
											href={item.href}
											className="font-semibold">
											{item.name}
										</Link>
									</Button>
								)}
							</Fragment>
					  ))
					: menuItems.map((item, index) => (
							<Fragment key={index}>
								{item.name !== "Contact" ? (
									<motion.li
										variants={itemMotion}
										className="md:hover:border-b md:hover:border-slate-700 md:dark:hover:border-slate-100 font-semibold">
										<Link
											href={item.href}
											scroll={true}
											prefetch={item.name === "Projects" || item.name === "Blogs"}>
											{item.name}
										</Link>
									</motion.li>
								) : (
									<ContactButton>
										<Link
											href={item.href}
											scroll={true}
											target="_blank">
											{item.name}
										</Link>
									</ContactButton>
								)}
							</Fragment>
					  ))}
			</AnimatePresence>
		</motion.ul>
	);
}
