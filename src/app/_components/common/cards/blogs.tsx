"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { motion } from "motion/react";
import { useHomeContext } from "@/app/_components/providers/home-provider";
import { BookCheck } from "lucide-react";
import { BlogsTooltip } from "@/app/_components/common/tooltips/blogs";
import { formattedDate } from "@/lib/date";
import { Badge } from "@/app/_components/ui/badge";
import {
	BlogCardSkeleton,
	NoBlogsSkeleton,
} from "@/app/_components/common/skeleton/blogs/blogs";

export function CardBlogs() {
	const { blogsData } = useHomeContext();
	const { blogs, isLoadingBlogs, childMotion } = blogsData;

	if (isLoadingBlogs) {
		return <BlogCardSkeleton />;
	}

	return (
		<motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
			{!isLoadingBlogs && blogs.length > 0 ? (
				<>
					{blogs.flatMap((blog, index) => (
						<motion.div
							key={index}
							variants={childMotion}
							whileHover={{
								y: -10,
								transition: { duration: 0.5 },
							}}
							className="flex flex-col gap-4 glassess border-glassess p-4 rounded-2xl hover:shadow-xl shadow-blue-500/30 transition-shadow max-h-fit">

							{/* Thumbnail */}
							<motion.div
								key={blog.title}
								variants={childMotion}
								className="aspect-video rounded-md overflow-hidden border-glassess relative">
								<Image
									src={blog.image}
									alt={blog.title}
									sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
									fill
									placeholder="blur"
									blurDataURL={blog.blurData}
								/>
							</motion.div>

							{/* Date */}
							<motion.div
								variants={childMotion}
								className="relative"
							>
								<Badge
									variant={"secondary"}
								>
									<motion.p
										variants={childMotion}
										className="text-sm text-muted-foreground">
										Published:{" "}
										{formattedDate(blog.publish_date)}
									</motion.p>
								</Badge>
							</motion.div>

							{/* Content */}
							<motion.div
								variants={childMotion}
								className="flex flex-col gap-4">
								<motion.div className="flex flex-col gap-4">
									<motion.div className="flex flex-col gap-2">
										<motion.h1
											variants={childMotion}
											className="text-lg sm:text-xl font-bold line-clamp-2">
											{blog.title}
										</motion.h1>
										<BlogsTooltip description={blog.description} />
									</motion.div>
									{/* Button */}
									<motion.div className="flex gap-4">
										<Button
											asChild
											variant={"outline"}>
											<Link
												href={`/blogs/${blog.slug}`}
												className="flex items-center !bg-transparent hover:!bg-gray-200/30 hover:dark:!bg-slate-200/10 gap-2 cursor-pointer w-full"
												prefetch>
												<motion.div className="relative">
													<BookCheck size={24} strokeWidth={2} />
												</motion.div>
												<motion.strong>Read more</motion.strong>
											</Link>
										</Button>
									</motion.div>
								</motion.div>
							</motion.div>
						</motion.div>
					))}
				</>
			) : (
				<NoBlogsSkeleton />
			)}
		</motion.div>
	);
}
