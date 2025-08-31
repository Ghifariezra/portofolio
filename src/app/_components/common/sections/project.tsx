"use client";

import { motion } from "motion/react";
import { useProject } from "@/hooks/project/useProject";

export default function Project() {
	const { titleSection, containerMotion } = useProject();
	return (
		<motion.section
			id="projects"
			variants={containerMotion}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false, amount: 0.1 }}
			exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
			className="flex flex-col min-h-screen py-6 px-6">
			<h1 className="text-2xl font-semibold text-muted-foreground">
				{titleSection}
			</h1>
		</motion.section>
	);
}
