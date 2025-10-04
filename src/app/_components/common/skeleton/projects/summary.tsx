"use client";

import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

type SummaryCardProps = {
	title: string;
	value: number | string;
	isLoading?: boolean;
	href: string;
};

function SummaryCard({ title, value, isLoading, href }: SummaryCardProps) {
	return (
		<div className="flex flex-col gap-4 glassess border-glassess p-4 rounded-2xl max-h-fit w-full">
			<h1 className="text-xl">{title}</h1>
			<p className={`${isLoading ? "text-xl" : "text-8xl"} font-bold text-center`}>
				{isLoading ? "Loading..." : value}
			</p>
			<Button variant="outline" asChild>
				<Link scroll={true} prefetch={true} href={href}>
					View All
				</Link>
			</Button>
		</div>
	);
}

export function SummarySkeleton({
    isLoading,
}: {
    isLoading: boolean;
}) {
	
	const totalProjects = 10;
	const totalBlogs = 5;

	return (
		<div className="flex flex-wrap sm:flex-nowrap w-full gap-4">
			<SummaryCard
				title="Total Projects"
				value={totalProjects}
				isLoading={isLoading}
				href="/#projects"
			/>
			<SummaryCard
				title="Total Blogs"
				value={totalBlogs}
				isLoading={isLoading}
				href="/#blogs"
			/>
		</div>
	);
}
