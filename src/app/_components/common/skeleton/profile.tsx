import Image from "next/image";

export function ProfileSkeleton() {
	return (
		<div className="w-full h-full bg-slate-300 dark:bg-slate-700 animate-pulse rounded-2xl" >
			<Image
				src="https://cdn1.iconfinder.com/data/icons/programming-92/512/Error_404.png"
				width={500}
				height={500}
				alt="No Data"
				className="bg-cover w-full h-full"
			/>
		</div>
	);
}
