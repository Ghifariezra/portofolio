'use client';

import { useHomeContext } from "@/app/_components/providers/home-provider";
import type { ChildrenProps } from "@/types/props/children";
import { MapPinned } from "lucide-react";
import { motion } from "motion/react";

export function CardStatus({ children, check }: Readonly<ChildrenProps>) {
	const { imageContainerMotion, childMotion } = useHomeContext();

	return (
		<motion.div
			initial="hidden"
			whileInView="inView"
			viewport={{ once: false, amount: 0.1 }}
			variants={imageContainerMotion}
			className="flex w-full justify-center items-center gap-4 rounded-full px-4 py-2 glassess border-glassess">
			<div className="flex gap-2 items-center">
				{check === "available" && (
					<>
						<motion.div
							variants={childMotion}
							className="relative w-4 h-4 bg-green-500 rounded-full"
						/>
						<div className="flex gap-1 items-center">
							{children}
						</div>
					</>
				)}
				{check === "location" && (
					<>
						<motion.div variants={childMotion}>
							<MapPinned size={20} strokeWidth={2} />
						</motion.div>
						<div className="flex gap-1 items-center">
							{children}
						</div>
					</>
				)}

				{check === "social-media" && (
					<div className="flex gap-2 items-center">{children}</div>
				)}
			</div>
		</motion.div>
	);
}
