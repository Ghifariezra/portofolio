import { motion } from "motion/react";

export function ProjectSkeleton({ length = 3 }: { length?: number }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
			{Array.from({ length }).map((_, i) => (
				<motion.div
					key={i}
					className="flex flex-col gap-4 glassess border-glassess p-4 rounded-2xl animate-pulse">
					{/* Image skeleton */}
					<div className="aspect-video rounded-md bg-slate-300/40" />

					{/* Title + desc */}
					<div className="flex flex-col gap-2">
						<div className="h-5 w-3/4 rounded-md bg-slate-300/40" />
						<div className="h-4 w-full rounded-md bg-slate-300/30" />
						<div className="h-4 w-5/6 rounded-md bg-slate-300/30" />
					</div>

					{/* Avatars */}
					<div className="flex gap-2 mt-2">
						<div className="w-8 h-8 rounded-full bg-slate-300/40" />
						<div className="w-8 h-8 rounded-full bg-slate-300/40" />
						<div className="w-8 h-8 rounded-full bg-slate-300/40" />
					</div>

					{/* Button */}
					<div className="h-9 w-24 rounded-md bg-slate-300/40 mt-3" />
				</motion.div>
			))}
		</div>
	);
}

export function NoProjectSkeleton() {
	return (
		<motion.div className="flex flex-col items-center justify-center glassess border-glassess rounded-2xl p-6 gap-3">
			<div className="aspect-video w-full rounded-md bg-slate-200/50 flex items-center justify-center">
				<span className="text-slate-500 text-sm">
					No Projects Found
				</span>
			</div>
			<p className="text-slate-500 text-center text-sm">
				Tidak ada project untuk ditampilkan.
			</p>
		</motion.div>
	);
}
