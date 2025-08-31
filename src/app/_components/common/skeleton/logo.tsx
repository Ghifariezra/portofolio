import { OctagonX, Loader } from "lucide-react";

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
			<OctagonX />
		</div>
	);
}
