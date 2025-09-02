"use client";
import { Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMenu } from "@/hooks/useMenu";
import Link from "next/link";
import type { ClassNameProps } from "@/types/props/className";
import ContactButton from "@/app/_components/ui/buttons/contact";

export function Menu({ className }: ClassNameProps) {
	const { containerMotion, itemMotion, menuItems } = useMenu();

	return (
		<motion.ul
			variants={containerMotion}
			initial="hidden"
			animate="visible"
			exit="hidden"
			className={`${className} items-center gap-6`}>
			<AnimatePresence mode="sync" initial={true}>
				{menuItems.map((item, index) => (
					<Fragment key={index}>
						{item.name !== "Contact" ? (
							<motion.li
								variants={itemMotion}
								className="md:hover:border-b md:hover:border-slate-700 md:dark:hover:border-slate-100 font-semibold">
								<Link href={item.href} scroll={true} prefetch={item.name === "Projects"}>
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
