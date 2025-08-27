"use client";
import Image from "next/image";
import Profile from "@/public/profile/profile.png";
import { motion } from "motion/react";
import { useHero } from "@/hooks/home/useHero";

export default function Hero() {
	const { imageMotion } = useHero();

	return (
		<section
			id="hero"
			className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-screen">
			<div className="flex flex-col items-center">
				<motion.div
					variants={imageMotion}
					initial="hidden"
					animate="visible"
					className="relative aspect-square size-3/4  overflow-hidden bg-slate-700/40 dark:bg-slate-100/40 rounded-full">
					<Image
						src={Profile}
						alt="avatar"
						priority
						placeholder="blur"
					/>
				</motion.div>
			</div>
			<motion.div className="flex flex-col gap-2 w-full">
				<motion.h1 className="text-3xl font-bold">
					Hi, I&apos;m Ghifari Ezra Ramadhan
				</motion.h1>
				<motion.h2 className="text-2xl font-semibold">
					Fullstack Developer
				</motion.h2>
			</motion.div>
		</section>
	);
}
