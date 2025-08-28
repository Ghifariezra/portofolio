"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { useAbout } from "@/hooks/about/useAbout";

export function CardAbout({
	checkDesc,
	checkProfile,
	className,
}: {
	checkDesc?: boolean;
	checkProfile?: boolean;
	className?: string;
}) {
	const {
		imageMotion,
		containerTitleMotion,
		childMotion,
		imageContainerMotion,
	} = useAbout();

	return (
		<>
			{/* Card */}
			<motion.div
				initial="hidden"
				whileInView="inView"
				viewport={{ once: false, amount: 0.1 }}
				variants={imageContainerMotion}
				className={`flex flex-col items-center glassess border-glassess gap-4 rounded-2xl ${className}`}>
				{checkDesc && (
					<motion.div
						className="flex flex-col items-center gap-3 w-full pb-2"
						variants={containerTitleMotion}
						initial="hidden"
						whileInView="inView">
						<motion.h1
							variants={childMotion}
							className="text-3xl font-semibold">
							About Me
						</motion.h1>
						<motion.p
							variants={childMotion}
							className="text-sm sm:text-base text-justify">
							I&apos;m a university student at Universitas
							Pancasila, currently exploring the world of
							full-stack web development. With a strong passion
							for technology, I&apos;m committed to continuous
							learning and building digital solutions that are
							both efficient and meaningful. I believe that
							technology is not just a tool, but a bridge to
							solving real-world problems. I&apos;m always open to
							collaboration, innovation, and new challenges in the
							web development space.
						</motion.p>
					</motion.div>
				)}
				{checkProfile && (
					<>
						{/* Profile */}
						<motion.div
							className="relative aspect-square overflow-hidden bg-slate-700/40 dark:bg-slate-100/40 rounded-2xl w-full h-full"
							variants={imageMotion}>
							<Image
								src="https://fegnkzxvhxnbvqkhuzfo.supabase.co/storage/v1/object/public/Portofolio/profile/logo.webp"
								width={1000}
								height={1000}
								alt="avatar"
								priority
								placeholder="blur"
								blurDataURL="data:image/webp;base64,UklGRhIAAABXRUJQVlA4TAYAAAAvAAAAAAfQ//73v/+BiOh/AAA="
								className="object-cover w-full h-full"
							/>
						</motion.div>

						{/* Name & Title */}
						<motion.div
							className="flex flex-col items-center gap-1 w-full pb-2"
							variants={containerTitleMotion}
							initial="hidden"
							whileInView="inView">
							<motion.h1
								variants={childMotion}
								className="text-xl font-bold text-center">
								Hi, I&apos;m Ghifari Ezra Ramadhan
							</motion.h1>
							<motion.h2
								variants={childMotion}
								className="text-lg font-semibold">
								Fullstack Developer
							</motion.h2>
						</motion.div>
					</>
				)}
			</motion.div>
		</>
	);
}
