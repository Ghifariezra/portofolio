import { OctagonX, Loader } from "lucide-react";

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
			<OctagonX size={16} />
		</div>
	);
}
