"use client";
import Image from "next/image";
import { useAbout } from "@/hooks/about/useAbout";
import { motion, AnimatePresence } from "motion/react";
import { CardAbout } from "@/app/_components/common/cards/about";
import { CardStatus } from "@/app/_components/common/cards/status";
import {
	SkillsSkeleton,
	NoSkillsSkeleton,
} from "@/app/_components/common/skeleton/socials";

export function ProfileStatus() {
	const {
		available,
		location,
		childMotion,
		containerTitleMotion,
		isSocialLoading,
		blurDataSocial,
		socials,
		socialMotion,
	} = useAbout();

	return (
		<>
			<motion.div
				initial="hidden"
				whileInView="inView"
				variants={containerTitleMotion}
				className="col-span-2 sm:order-1 flex flex-col-reverse sm:flex-col gap-4 w-full">
				<motion.div className="flex flex-col sm:flex-row gap-2">
					<CardStatus check="available">
						{available &&
							available.split(" ").map((word, index) => (
								<motion.strong
									key={index}
									variants={childMotion}>
									{word}
								</motion.strong>
							))}
					</CardStatus>
					<CardStatus check="location">
						{location &&
							location.split(" ").map((word, index) => (
								<motion.strong
									key={index}
									variants={childMotion}>
									{word}
								</motion.strong>
							))}
					</CardStatus>

					<CardStatus check="social-media">
						{isSocialLoading ? (
							<SkillsSkeleton />
						) : socials &&
						  socials.length > 0 &&
						  blurDataSocial.length > 0 ? (
							<AnimatePresence mode="sync">
								{socials.map((social, index) => (
									<motion.div
										key={social.name}
										variants={socialMotion}
										initial="hidden"
										whileInView="inView"
										whileHover="hover"
										transition={{ delay: index * 0.3 }}
										className="w-8 h-8 bg-slate-300/30  rounded-full overflow-hidden cursor-pointer">
										<Image
											src={social.url}
											alt="Logo"
											width={100}
											height={100}
											placeholder="blur"
											blurDataURL={blurDataSocial[index]}
											className="scale-60"
										/>
									</motion.div>
								))}
							</AnimatePresence>
						) : (
							<NoSkillsSkeleton />
						)}
					</CardStatus>
				</motion.div>
				<CardAbout checkSkills={true} className="max-w-full p-6" />
				<CardAbout checkDesc={true} className="max-w-full p-6" />
			</motion.div>
			<CardAbout
				checkProfile={true}
				className="max-w-full h-full col-span-1 p-1"
			/>
		</>
	);
}
