	const Skeleton = () => (
		<>
			{Array.from({ length: 2 }).map((_, index) => (
				<div
					key={index}
					className="relative aspect-video w-full rounded-md overflow-hidden border">
					<div className="w-full h-full bg-slate-300/30 animate-pulse" />
				</div>
			))}
		</>
	);


export function LoadingSkeleton() {
    return (
		<section
			id="certificates"
			className="flex items-center justify-center gap-6 p-8">
			<Skeleton />
		</section>
	);
}

export function ErrorSkeleton() {
	return (
		<section
			id="certificates"
			className="flex items-center justify-center p-8">
			<p className="text-red-500">Failed to load certificates.</p>
		</section>
	);
}

export function EmptySkeleton() {
    return (
		<section
			id="certificates"
			className="flex items-center justify-center p-8">
			<p>No certificates found.</p>
		</section>
	);
}