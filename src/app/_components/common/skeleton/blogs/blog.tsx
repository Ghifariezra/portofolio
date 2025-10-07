"use client";

import { motion } from "motion/react";

export function BlogDetailSkeleton() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="flex flex-col items-center justify-center min-h-screen my-33 mx-6">
			<div className="w-full flex flex-col gap-8 py-6 sm:py-10 px-6 sm:px-10 glassess border-glassess rounded-2xl shadow-xl animate-pulse">
				{/* 🖼️ Thumbnail */}
				<div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-r from-gray-300/40 via-gray-200/30 to-gray-300/40 dark:from-slate-700/40 dark:via-slate-600/30 dark:to-slate-700/40 animate-[pulse_1.8s_ease-in-out_infinite]" />

				{/* 🏷️ Title */}
				<div className="flex flex-col gap-3 mt-2">
					<div className="h-8 w-3/4 bg-gray-300/40 dark:bg-slate-700/40 rounded-md" />
					<div className="h-5 w-1/2 bg-gray-300/40 dark:bg-slate-700/40 rounded-md" />
				</div>

				{/* 🧠 Body Content */}
				<div className="flex flex-col gap-5 mt-4">
					{/* Paragraphs */}
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="flex flex-col gap-2">
							<div className="h-4 w-[95%] bg-gray-300/40 dark:bg-slate-700/40 rounded-md" />
							<div className="h-4 w-[85%] bg-gray-300/40 dark:bg-slate-700/40 rounded-md" />
							<div className="h-4 w-[92%] bg-gray-300/40 dark:bg-slate-700/40 rounded-md" />
						</div>
					))}

					{/* ✨ Simulasi Heading (h2) */}
					<div className="mt-6 h-6 w-1/3 bg-gray-300/40 dark:bg-slate-700/40 rounded-md" />

					{/* Simulasi kode markdown */}
					<div className="mt-3 bg-gray-800/20 dark:bg-slate-800/60 p-4 rounded-lg space-y-2">
						<div className="h-3 w-[90%] bg-gray-500/50 rounded" />
						<div className="h-3 w-[80%] bg-gray-500/50 rounded" />
						<div className="h-3 w-[60%] bg-gray-500/50 rounded" />
					</div>

					{/* ✨ Paragraf lanjutan */}
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="flex flex-col gap-2">
							<div className="h-4 w-[90%] bg-gray-300/40 dark:bg-slate-700/40 rounded-md" />
							<div className="h-4 w-[80%] bg-gray-300/40 dark:bg-slate-700/40 rounded-md" />
						</div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
