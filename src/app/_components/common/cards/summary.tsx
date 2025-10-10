"use client";

import Link from "next/link";
import { useHomeContext } from "@/app/_components/providers/home-provider";
import { Button } from "@/app/_components/ui/button";
import { SummarySkeleton } from "@/app/_components/common/skeleton/projects/summary";

export function Summary() {
	const { projectData, blogsData } = useHomeContext();
	const { projects, isProjectLoading } = projectData;
	const { blogs, isLoadingBlogs } = blogsData;

	if (isProjectLoading || isLoadingBlogs) {
		return <SummarySkeleton isLoading={isProjectLoading} />;
	}

	return (
		<div className="flex flex-wrap sm:flex-nowrap w-full gap-4">
			<div className="flex flex-col gap-4 glassess border-glassess p-4 rounded-2xl max-h-fit w-full">
				<h1 className="text-xl">Total Projects</h1>
				<p className="text-8xl font-bold text-center">
					{projects.length}
				</p>
				<Button variant={"outline"} asChild>
					<Link
						scroll={true}
						prefetch={true}
						href="/dashboard/projects">
						View All
					</Link>
				</Button>
			</div>

			<div className="flex flex-col gap-4 glassess border-glassess p-4 rounded-2xl max-h-fit w-full">
				<h1 className="text-xl">Total Blogs</h1>
				<p className="text-8xl font-bold text-center">
					{blogs.length}
				</p>
				<Button variant={"outline"} asChild>
					<Link
						scroll={true}
						prefetch={true}
						href="/dashboard/blogs">
						View All
					</Link>
				</Button>
			</div>
		</div>
	);
}
