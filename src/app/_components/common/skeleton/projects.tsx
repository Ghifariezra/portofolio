import { motion } from "motion/react";

export function ProjectSkeleton({ length }: { length: number }) {
	return (
		<>
			{Array.from({ length: length }).map((_, i) => (
				<motion.div
					key={i}
					className="aspect-square glassess border-glassess animate-pulse rounded-md"
				/>
			))}
		</>
	);
}
export function NoProjectSkeleton() {
	return (
		<>
			{Array.from({ length: 1 }).map((_, i) => (
				<motion.div
					key={i}
					className="aspect-square glassess border-glassess animate-pulse rounded-md"
				/>
			))}
		</>
	);
}
