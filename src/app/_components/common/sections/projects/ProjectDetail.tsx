"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { Avatars } from "@/app/_components/ui/avatars/avatars";
import { useProjectBySlug } from "@/hooks/project/useProjectBySlug";
import {
	ProjectSkeleton,
	ProjectNotFound,
} from "@/app/_components/common/skeleton/projects/project";

export function ProjectDetail({ slug }: { slug: string }) {
	const { data: project, isLoading } = useProjectBySlug(slug);

	if (isLoading) {
		return <ProjectSkeleton />;
	}

	if (!project) {
		return <ProjectNotFound />;
	}

	return (
		<motion.section
			key={slug}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col items-center justify-center mt-33 mb-12 mx-6">
			<div className="relative flex flex-col gap-6 w-fit h-full py-4 sm:py-8 px-4 sm:px-8 glassess border-glassess rounded-2xl">
				<div className="relative aspect-video w-full rounded-md overflow-hidden border-glassess">
					<Image
						src={project.imageUrl}
						alt={project.title}
						fill
						priority
						placeholder="blur"
						blurDataURL={project.blurData}
						className="object-cover"
					/>
				</div>
				<Avatars
					contributors={project.partner_team}
					socialMedia={project.partner_social_media}
				/>
				<div className="flex flex-col gap-2">
					<h1 className="text-lg sm:text-2xl font-semibold wi-full">
						{project.title}
					</h1>
					<p>{project.description}</p>

					{/* Video Display */}
					{project.video_url && (
						<div className="flex flex-col gap-4 rounded-2xl">
							<h2 className="text-lg sm:text-2xl font-semibold">Video Preview</h2>
							<iframe
								className="aspect-video w-full rounded-md overflow-hidden border-glassess"
								src={project.video_url}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen>
							</iframe>
						</div>
					)}
				</div>
			</div>
		</motion.section>
	);
}
