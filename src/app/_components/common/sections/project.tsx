"use client";

import { motion } from "motion/react";
import { useHomeContext } from "@/app/_components/providers/home-provider";
import { StatusProject } from "@/app/_components/common/dropdown/status-project";
import { CardProjects } from "@/app/_components/common/cards/projects";

export default function Project() {
	const { projectData } = useHomeContext();
	const { titleSection, containerMotion, childMotion } = projectData;

	return (
		<motion.section
			id="projects"
			variants={containerMotion}
			initial="hidden"
			animate="visible"
			whileInView="visible"
			className="flex flex-col min-h-screen py-6 px-6 gap-6">
			<motion.h1
				variants={childMotion}
				className="text-xl sm:text-2xl font-semibold">
				{titleSection}
			</motion.h1>
			<motion.div variants={childMotion} className="flex flex-col gap-8">
				<motion.div className="flex gap-4 justify-between">
					{/* Dropdown */}
					<StatusProject check="status" />
					<StatusProject check="category" />
				</motion.div>
				{/* Projects */}
				<CardProjects />
			</motion.div>
		</motion.section>
	);
}
