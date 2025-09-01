import { Loader } from "lucide-react";
import Image from "next/image";

export function SocialsSkeleton() {
	return (
		<div className="w-8 h-8 bg-slate-300 dark:bg-slate-700 animate-pulse rounded-full flex items-center justify-center">
			<Loader className="animate-spin" size={16} />
		</div>
	);
}

export function NoSocialsSkeleton() {
	return (
		<div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-xs text-gray-500 font-bold">
			<Image
				src="https://cdn1.iconfinder.com/data/icons/programming-92/512/Error_404.png"
				width={500}
				height={500}
				alt="No Data"
				className="bg-cover w-8 h-8"
			/>
		</div>
	);
}
