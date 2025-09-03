"use client";
import { motion } from "motion/react";
import { useHero } from "@/hooks/home/useHero";
import { memo } from "react";

function Hero() {
	const { containerMotion, quoteMotion, quoteTransform } = useHero();

	return (
		<motion.section
			id="hero"
			className="flex items-center justify-center gap-6 min-h-screen mask-b-from-0% p-15 sm:p-8"
			variants={containerMotion}
			initial="hidden"
			animate="visible">
			<motion.div className="flex flex-col gap-8 max-w-2xl lg:max-w-4xl">
				<motion.h1
					variants={quoteMotion}
					style={{ ...quoteTransform }}
					className="text-2xl sm:text-4xl md:text-7xl">
					Building responsive and scalable web applications.
				</motion.h1>
			</motion.div>
		</motion.section>
	);
}

export default memo(Hero);