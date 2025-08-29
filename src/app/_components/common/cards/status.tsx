import { useAbout } from "@/hooks/about/useAbout";
import type { ChildrenProps } from "@/types/props/children";
import { MapPinned } from "lucide-react";
import { motion } from "motion/react";
export function CardStatus({ children, check }: Readonly<ChildrenProps>) {
	const { childMotion } = useAbout();

	return (
		<div className="flex w-full sm:w-fit justify-center items-center gap-4 rounded-full border px-4 py-2 glassess">
			<div className="flex gap-2 items-center">
				{check === "available" && (
					<motion.div
						variants={childMotion}
						className="relative w-4 h-4 bg-green-500 rounded-full"
					/>
				)}
				{check === "location" && (
					<motion.div variants={childMotion}>
						<MapPinned size={20} strokeWidth={2} />
					</motion.div>
				)}
				<div className="flex gap-1 items-center">{children}</div>
			</div>
		</div>
	);
}
