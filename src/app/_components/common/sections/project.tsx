"use client";

import { motion } from "motion/react";
import { useHomeContext } from "@/app/_components/providers/home-provider";
import Image from "next/image";
import {
	ProjectSkeleton,
	NoProjectSkeleton,
} from "@/app/_components/common/skeleton/projects";
import { Button } from "@/app/_components/ui/button";
import { BookCheck } from "lucide-react";

export default function Project() {
	const { projectData } = useHomeContext();
	const {
		titleSection,
		containerMotion,
		childMotion,
		projects,
		isProjectLoading,
		blurDataProjects,
	} = projectData;

	return (
		<motion.section
			id="projects"
			variants={containerMotion}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false, amount: 0.1 }}
			exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
			className="flex flex-col min-h-screen py-6 px-6 gap-8">
			<motion.h1
				variants={childMotion}
				className="text-xl sm:text-2xl font-semibold">
				{titleSection}
			</motion.h1>
			<motion.div
				variants={childMotion}
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
				{isProjectLoading ? (
					<ProjectSkeleton length={projects.length} />
				) : !isProjectLoading &&
				  projects.length > 0 &&
				  blurDataProjects.length > 0 ? (
					<>
						{projects.map((project, index) => (
							<motion.div
								key={project.name}
								variants={childMotion}
								whileHover={{
									y: -10,
									transition: { duration: 0.5 },
								}}
								className="flex flex-col gap-4 glassess border-glassess p-4 rounded-2xl hover:shadow-xl shadow-blue-500/30 transition-shadow">
								<motion.div
									key={project.name}
									variants={childMotion}
									className="aspect-video rounded-md overflow-hidden border-glassess relative">
									<Image
										src={project.url}
										alt={project.name}
										fill
										priority
										placeholder="blur"
										style={{ objectFit: "cover" }}
										blurDataURL={blurDataProjects[index]}
										sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
									/>
								</motion.div>
								<motion.div
									variants={childMotion}
									className="flex flex-col gap-4">
									{/* Badge */}
									<div className="flex flex-wrap gap-2 items-center">
										<div className="w-fit text-slate-50 text-sm px-2 py-1 rounded-full border">
											Lorem.
										</div>
									</div>

									{/* Content */}
									<motion.div className="flex flex-col gap-4">
										<motion.div className="flex flex-col gap-1">
											<motion.h1
												variants={childMotion}
												className="text-lg sm:text-xl font-bold">
												{project.name}
											</motion.h1>
											<motion.p
												variants={childMotion}
												className="text-sm">
												Lorem ipsum dolor sit, amet
												consectetur adipisicing elit.
												Sunt omnis voluptas reiciendis
												minima similique fuga repellat
												qui blanditiis aliquid
												voluptatum!
											</motion.p>
										</motion.div>
										<motion.div className="w-full flex justify-end text-slate-50">
											<Button
												variant="outline"
												className="flex items-center !bg-blue-500 gap-2 cursor-pointer">
												<motion.div className="relative">
													<BookCheck
														size={16}
														color="white"
													/>
												</motion.div>
												<motion.strong>
													Read more
												</motion.strong>
											</Button>
										</motion.div>
									</motion.div>
								</motion.div>
							</motion.div>
						))}
					</>
				) : (
					<NoProjectSkeleton />
				)}
			</motion.div>
		</motion.section>
	);
}
