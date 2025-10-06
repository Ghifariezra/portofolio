"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useBlogBySlug } from "@/hooks/blogs/useBlogBySlug";
import { NoBlogsSkeleton } from "@/app/_components/common/skeleton/blogs/blogs";
import { BlogDetailSkeleton } from "@/app/_components/common/skeleton/blogs/blog";
import { Markdown } from "@/app/_components/common/markdown/markdown";

export function BlogDetail({ slug }: { slug: string }) {
	const { data, isLoading } = useBlogBySlug(slug);

	if (isLoading) return <BlogDetailSkeleton />;
	if (!data) return <NoBlogsSkeleton />;

	return (
		<motion.section
			key={slug}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col items-center justify-center min-h-screen my-33 mx-6">
			<div className="w-full flex flex-col gap-8 py-6 sm:py-10 px-6 sm:px-10 glassess border-glassess rounded-2xl shadow-xl">
				{/* 🖼️ Blog Thumbnail */}
				<div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10">
					<Image
						src={data.image}
						alt={data.title}
						fill
						priority
						quality={100}
						placeholder="blur"
						blurDataURL={data.blurData}
						className="object-cover"
					/>
				</div>

				{/* 📄 Blog Content */}
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl sm:text-3xl font-bold leading-tight">
						{data.title}
					</h1>

					{/* 🧠 Markdown Body */}
					<Markdown 
						content={data.content}
						lang={data.language}
					/>
				</div>
			</div>
		</motion.section>
	);
}
