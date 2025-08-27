"use client";
import { motion, AnimatePresence } from "motion/react";
import { useMenu } from "@/hooks/useMenu";
import { menuItems } from "@/utilities/menu/menu";
import Link from "next/link";
import type { ClassNameProps } from "@/types/props/className";

export function Menu({ className }: ClassNameProps) {
	const { containerMotion, itemMotion } = useMenu();

	return (
		<motion.ul
			variants={containerMotion}
			initial="hidden"
			animate="visible"
			exit="hidden"
			className={`${className} items-center gap-6`}>
			<AnimatePresence mode="sync" initial={true}>
				{menuItems.map((item, index) => (
					<motion.li
						variants={itemMotion}
						key={index}
						className="md:hover:border-b md:hover:border-slate-700 md:dark:hover:border-slate-100 font-semibold">
						<Link href={item.href} scroll={true}>{item.name}</Link>
					</motion.li>
				))}
			</AnimatePresence>
		</motion.ul>
	);
}
