"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function BlogCardSkeleton({ length = 3 }: { length?: number }) {
	return (
		<motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
			{Array.from({ length }).map((_, i) => (
				<motion.div
					key={i}
					className={cn(
						"flex flex-col gap-4 glassess border-glassess p-4 rounded-2xl animate-pulse"
					)}>
					{/* Thumbnail */}
					<div className="aspect-video bg-gray-300/40 dark:bg-slate-700/40 rounded-md" />

					{/* Title */}
					<div className="flex flex-col gap-3 mt-2">
						<div className="h-5 bg-gray-300/40 dark:bg-slate-700/40 rounded w-3/4" />
						<div className="h-4 bg-gray-300/40 dark:bg-slate-700/40 rounded w-1/2" />
					</div>

					{/* Button Placeholder */}
					<div className="h-10 bg-gray-300/40 dark:bg-slate-700/40 rounded-lg w-full mt-3" />
				</motion.div>
			))}
		</motion.div>
	);
}

export function NoBlogsSkeleton() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex flex-col items-center justify-center text-center py-20 gap-4 glassess border-glassess rounded-2xl my-33 mx-6">
			{/* Icon / Illustration */}
			<div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
				<span className="text-4xl">📰</span>
			</div>

			{/* Message */}
			<motion.h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300">
				No blogs available
			</motion.h2>

			<motion.p className="text-gray-500 dark:text-gray-400 max-w-sm">
				It seems there are no blog posts yet. Please check back later or
				add your first article.
			</motion.p>
		</motion.div>
	);
}