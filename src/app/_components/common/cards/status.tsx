"use client";

import type { ChildrenProps } from "@/types/props/children";
import { MapPinned } from "lucide-react";
import { motion } from "motion/react";

export function CardStatus({ children, check }: Readonly<ChildrenProps>) {
	return (
		<motion.div
			className="flex w-full justify-center items-center gap-4 rounded-full px-4 py-2 glassess border-glassess">
			<motion.div className="flex gap-2 items-center">
				{check === "available" && (
					<>
						<motion.div
							className="relative w-4 h-4 bg-green-500 rounded-full"
						/>
						<motion.div className="flex gap-2 items-center">
							{children}
						</motion.div>
					</>
				)}
				{check === "location" && (
					<>
						<motion.div>
							<MapPinned size={20} strokeWidth={2} />
						</motion.div>
						<motion.div className="flex gap-2 items-center">
							{children}
						</motion.div>
					</>
				)}

				{check === "social-media" && (
					<motion.div className="flex gap-2 items-center">{children}</motion.div>
				)}
			</motion.div>
		</motion.div>
	);
}
