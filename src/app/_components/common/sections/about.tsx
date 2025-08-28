"use client";
import { motion, AnimatePresence } from "motion/react";
import { CardAbout } from "@/app/_components/common/cards/about";
import { MapPinned } from "lucide-react";
import { useAbout } from "@/hooks/about/useAbout";

export default function About() {
	const { childMotion, imageContainerMotion } = useAbout();
	return (
		<AnimatePresence>
			<motion.section
				id="about"
				initial="hidden"
				whileInView="inView"
				viewport={{ once: false, amount: 0.1 }}
				exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
				className="flex flex-col-reverse sm:grid sm:grid-cols-3 lg:flex-row items-center justify-center min-h-screen py-4 px-6 gap-8">
				{/* About */}
				<motion.div
					initial="hidden"
					whileInView="inView"
					viewport={{ once: false, amount: 0.1 }}
					variants={imageContainerMotion}
					className="col-span-2 flex flex-col-reverse sm:flex-col gap-4 w-full">
					<motion.div className="flex flex-col sm:flex-row gap-2">
						<motion.div className="flex w-full sm:w-fit justify-center items-center gap-4 rounded-full border px-4 py-2 glassess">
							<motion.div
								variants={childMotion}
								className="relative w-4 h-4 bg-green-500 rounded-full"
							/>
							<motion.div className="flex gap-1.5">
								<motion.strong variants={childMotion}>
									Available
								</motion.strong>
								<motion.strong variants={childMotion}>
									for
								</motion.strong>
								<motion.strong variants={childMotion}>
									project
								</motion.strong>
							</motion.div>
						</motion.div>
						<motion.div className="flex w-full sm:w-fit justify-center items-center gap-4 rounded-full border px-4 py-2 glassess">
							<motion.div variants={childMotion}>
								<MapPinned size={20} strokeWidth={2} />
							</motion.div>
							<motion.div className="flex gap-2">
								<motion.strong variants={childMotion}>
									Jakarta,
								</motion.strong>
								<motion.strong variants={childMotion}>
									Indonesia
								</motion.strong>
							</motion.div>
						</motion.div>
					</motion.div>
					<CardAbout checkDesc={true} className="max-w-full p-6" />
				</motion.div>
				<CardAbout
					checkProfile={true}
					className="max-w-full h-full col-span-1 p-1"
				/>
			</motion.section>
		</AnimatePresence>
	);
}
