export function TableSkeleton() {
	return (
		<div className="flex flex-col gap-4 animate-pulse">
			<div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
			<div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl">
				{/* Header skeleton */}
				<div className="grid grid-cols-6 gap-2 bg-gray-100 dark:bg-gray-800 p-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
					))}
				</div>
				{/* Rows skeleton */}
				{Array.from({ length: 6 }).map((_, rowIndex) => (
					<div
						key={rowIndex}
						className="grid grid-cols-6 gap-2 border-t border-gray-200 dark:border-gray-700 p-3">
						{Array.from({ length: 6 }).map((_, colIndex) => (
							<div
								key={colIndex}
								className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}