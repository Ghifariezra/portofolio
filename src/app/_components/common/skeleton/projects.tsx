import { motion } from "motion/react";
import Image from "next/image";
import { Loader } from "lucide-react";

export function ProjectSkeleton({ length }: { length: number }) {
	return (
		<>
			{Array.from({ length: length }).map((_, i) => (
				<motion.div
					key={i}
					className="aspect-square glassess border-glassess animate-pulse rounded-md flex items-center justify-center"
				>
					<Loader className="animate-spin" size={24} />
				</motion.div>
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
					className="aspect-square flex items-center justify-center glassess border-glassess animate-pulse rounded-md">
					<Image
						src="https://cdn1.iconfinder.com/data/icons/programming-92/512/Error_404.png"
						width={500}
						height={500}
						alt="No Data"
						className="bg-cover w-full h-full"
					/>
				</motion.div>
			))}
		</>
	);
}
