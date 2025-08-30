import Loader from "@/app/_components/ui/loaders/skeleton";
import { OctagonX } from "lucide-react";

export function SocialsSkeleton() {
	return (
		<div className="w-8 h-8 bg-slate-300 dark:bg-slate-700 animate-pulse rounded-full flex items-center justify-center">
			<Loader />
		</div>
	);
}

export function NoSocialsSkeleton() {
	return (
		<div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-xs text-gray-500 font-bold">
			<OctagonX />
		</div>
	);
}
