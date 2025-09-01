import { Loader } from "lucide-react";
import Image from "next/image";

export function LogoSkeleton() {
	return (
		<div className="absolute inset-0 bg-slate-700/10 dark:bg-slate-100/10 animate-pulse flex items-center justify-center">
			<Loader className="animate-spin" size={12} />
		</div>
	);
}

export function NoLogoSkeleton() {
	return (
		<div className="absolute inset-0 bg-slate-700/10 dark:bg-slate-100/10 flex items-center justify-center">
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
