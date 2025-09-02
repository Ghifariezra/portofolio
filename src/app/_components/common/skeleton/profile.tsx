import { Loader } from "lucide-react";

export function ProfileSkeleton() {
	return (
		<div className="w-full h-full bg-slate-300 dark:bg-slate-700 animate-pulse rounded-2xl flex items-center justify-center" >
			<Loader className="animate-spin" size={24} />
		</div>
	);
}
