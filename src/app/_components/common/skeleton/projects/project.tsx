export function ProjectNotFound() {
    return (
        <div className="flex items-center justify-center my-33 mx-6">
            <h1 className="text-2xl font-bold">Project not found</h1>
        </div>
    );
}

export function ProjectSkeleton() {
    return (
		<section
			className="flex flex-col items-center justify-center my-33 mx-6">
			<div className="relative flex flex-col gap-6 w-full h-full py-4 sm:py-8 px-4 sm:px-8 glassess border-glassess rounded-2xl">
				{/* Skeleton gambar */}
				<div className="relative aspect-video w-full rounded-md overflow-hidden border-glassess">
					<div className="w-full h-full bg-slate-300/30 animate-pulse" />
				</div>

				{/* Skeleton contributors */}
				<div className="flex items-center gap-2">
					<div className="h-4 w-20 bg-slate-300/30 rounded animate-pulse" />
					<div className="flex -space-x-3">
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="w-8 h-8 rounded-full bg-slate-300/30 border animate-pulse"
							/>
						))}
					</div>
				</div>

				{/* Skeleton judul dan deskripsi */}
				<div className="flex flex-col gap-2">
					<div className="h-6 w-2/3 bg-slate-300/30 rounded animate-pulse" />
					<div className="h-4 w-full bg-slate-300/30 rounded animate-pulse" />
					<div className="h-4 w-5/6 bg-slate-300/30 rounded animate-pulse" />
				</div>
			</div>
		</section>
	);
}