"use client";

import { motion } from "motion/react";
import { useHomeContext } from "@/app/_components/providers/home-provider";
import Image from "next/image";
import {
	ProjectSkeleton,
	NoProjectSkeleton,
} from "@/app/_components/common/skeleton/projects";
import { ButtonProjects } from "@/app/_components/ui/buttons/projects";
import { Avatars } from "@/app/_components/ui/avatars/avatars";

export function CardProjects() {
	const { projectData } = useHomeContext();
	const { childMotion, projects, isProjectLoading, blurDataProjects } =
		projectData;

	return (
		<motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
			{isProjectLoading ? (
				<ProjectSkeleton length={projects.length} />
			) : !isProjectLoading &&
			  projects.length > 0 &&
			  blurDataProjects.length > 0 ? (
				<>
					{projects.map((project, index) => (
						<motion.div
							key={project.uuid}
							variants={childMotion}
							whileHover={{
								y: -10,
								transition: { duration: 0.5 },
							}}
							className="flex flex-col gap-4 glassess border-glassess p-4 rounded-2xl hover:shadow-xl shadow-blue-500/30 transition-shadow max-h-fit">
							<motion.div
								key={project.title}
								variants={childMotion}
								className="aspect-video rounded-md overflow-hidden border-glassess relative">
								<Image
									src={project.image}
									alt={project.title}
									sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
									fill
									priority
									style={{ objectFit: "cover" }}
									blurDataURL={blurDataProjects[index]}
								/>
							</motion.div>
							<motion.div
								variants={childMotion}
								className="flex flex-col gap-4">
								{/* Content */}
								<motion.div className="flex flex-col gap-4">
									<motion.div className="flex flex-col gap-2">
										<motion.h1
											variants={childMotion}
											className="text-lg sm:text-xl font-bold line-clamp-2">
											{project.title}
										</motion.h1>
										<motion.p
											variants={childMotion}
											className="text-sm line-clamp-2">
											{project.description}
										</motion.p>
									</motion.div>
									{/* Avatars */}
									<Avatars
										contributors={project.partner_team}
									/>
									{/* Button */}
									<ButtonProjects url={project.demo} />
								</motion.div>
							</motion.div>
						</motion.div>
					))}
				</>
			) : (
				<NoProjectSkeleton />
			)}
		</motion.div>
	);
}
