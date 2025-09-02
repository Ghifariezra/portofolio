"use client";
import { motion } from "motion/react";
import type { ProjectBySlugResponse } from "@/types/response/assets";
import Image from "next/image";
import { Avatars } from "@/app/_components/ui/avatars/avatars";

export function Project({ project }: { project: ProjectBySlugResponse }) {
	return (
		<motion.section
			key={project.slug}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col items-center justify-center min-h-screen sm:my-23 my-12 mx-4 sm:mx-8">
			<div className="relative flex flex-col gap-6 w-fit h-full py-4 sm:py-8 px-4 sm:px-8 glassess border-glassess rounded-2xl">
				<div className="relative aspect-video w-full rounded-md overflow-hidden border-glassess">
					<Image
						src={project.image}
						alt={project.title}
						fill
						priority
						quality={100}
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
				</div>
			</div>
		</motion.section>
	);
}
