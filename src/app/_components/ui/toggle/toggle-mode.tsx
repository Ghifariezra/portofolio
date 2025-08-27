"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useThemes } from "@/hooks/useThemes";
import { AnimatePresence, motion } from "motion/react";
import { memo } from "react";

function ModeToggle() {
	const { toggleTheme, checkToggle, iconVariants } = useThemes();

	return (
		<Button
			size="icon"
			onClick={toggleTheme}
			className="!bg-transparent justify-self-center rounded-full shadow-none cursor-pointer !text-slate-700 dark:!text-slate-100 !border !border-slate-700/10 dark:!border-slate-100/10">
			<AnimatePresence mode="wait" initial={false}>
				{checkToggle ? (
					<motion.div
						key="light"
						variants={iconVariants}
						initial="hidden"
						animate="visible"
						exit="exit">
						<Sun />
					</motion.div>
				) : (
					<motion.div
						key="dark"
						variants={iconVariants}
						initial="hidden"
						animate="visible"
						exit="exit">
						<Moon />
					</motion.div>
				)}
			</AnimatePresence>
		</Button>
	);
}

export default memo(ModeToggle);
