"use client";

import { motion } from "motion/react";
import { MoveUp } from "lucide-react";
import Link from "next/link";
import { useSot } from "@/hooks/useSot";

export default function Sot() {
    const { onScroll } = useSot();

    if (!onScroll) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
			whileTap={{ scale: 0.9 }}
			transition={{
				type: "spring",
				stiffness: 400,
				damping: 17,
			}}
			className="fixed bottom-4 right-4 w-fit glassess border-glassess rounded-full p-2 select-none cursor-pointer">
			<Link href="#top" className="flex items-center gap-2">
				<MoveUp
					size={20}
					strokeWidth={2}
					className="text-slate-500 dark:text-slate-400"
				/>
			</Link>
		</motion.div>
	);
}
