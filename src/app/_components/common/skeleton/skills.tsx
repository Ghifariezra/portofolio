import { OctagonX, Loader } from "lucide-react";

export function SkillsSkeleton() {
	return (
		<div className="w-12 h-12 bg-slate-300 dark:bg-slate-700 animate-pulse rounded-full flex items-center justify-center" >
			<Loader className="animate-spin" size={24} />
		</div>
	);
}

export function NoSkillsSkeleton() {
	return (
		<div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-xs text-gray-500 font-bold">
			<OctagonX size={24} />
		</div>
	);
}
