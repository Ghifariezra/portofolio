"use client";
import { motion, AnimatePresence } from "motion/react";
import { ProfileStatus } from "@/app/_components/common/status/status";

export default function About() {
	return (
		<AnimatePresence>
			<motion.section
				id="about"
				initial="hidden"
				whileInView="inView"
				viewport={{ once: false, amount: 0.1 }}
				exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
				className="flex flex-col-reverse sm:grid sm:grid-cols-3 lg:flex-row items-center justify-center min-h-screen py-4 px-6 gap-8">
				<ProfileStatus />
			</motion.section>
		</AnimatePresence>
	);
}
