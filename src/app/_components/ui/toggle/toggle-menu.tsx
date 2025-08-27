"use client";

import { motion, AnimatePresence } from "motion/react";
import { MenuIcon, X } from "lucide-react";
import type { ClassNameProps } from "@/types/props/className";

export default function MenuToggle({
	toggleMenu,
	menuOpen,
	className,
}: {
	toggleMenu: () => void;
	menuOpen: boolean;
	className?: string;
} & ClassNameProps) {
	return (
		<motion.div className={className} onClick={toggleMenu}>
			<AnimatePresence mode="wait" initial={false}>
				{menuOpen ? <X /> : <MenuIcon />}
			</AnimatePresence>
		</motion.div>
	);
}
