import Loader from "@/app/_components/ui/loaders/skeleton";

export function LogoSkeleton() {
	return (
		<div className="absolute inset-0 bg-slate-700/10 dark:bg-slate-100/10 animate-pulse flex items-center justify-center">
			<Loader />
		</div>
	);
}
