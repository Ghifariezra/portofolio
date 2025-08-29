"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { useAbout } from "@/hooks/about/useAbout";
import { Replace } from "lucide-react";
import { useLogo } from "@/hooks/useLogo";
import {
	SkillsSkeleton,
	NoSkillsSkeleton,
} from "@/app/_components/common/skeleton/skills";
import { ProfileSkeleton } from "@/app/_components/common/skeleton/profile";

export function CardAbout({
	checkDesc,
	checkProfile,
	checkSkills,
	className,
}: {
	checkDesc?: boolean;
	checkProfile?: boolean;
	checkSkills?: boolean;
	className?: string;
}) {
	const {
		imageMotion,
		containerTitleMotion,
		childMotion,
		imageContainerMotion,
		replaceMotion,
		changeProfile,
		change,
		isSkillsLoading,
		blurDataSkills,
		skills,
		skillsMotion,
	} = useAbout();
	const { logo, profile, blurDataLogo, isProfileLoading } = useLogo();

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
						className="flex flex-col items-center sm:items-start gap-3 w-full pb-2"
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

				{checkSkills && (
					<motion.div
						className="flex flex-col items-center sm:items-start gap-3 w-full pb-2"
						variants={containerTitleMotion}
						initial="hidden"
						whileInView="inView">
						<motion.h1
							variants={childMotion}
							className="text-2xl sm:text-3xl font-semibold">
							Toolbox
						</motion.h1>
						<motion.div
							variants={childMotion}
							className="flex flex-wrap gap-2">
							{isSkillsLoading ? (
								<SkillsSkeleton />
							) : skills.length > 0 &&
							  blurDataSkills.length > 0 ? (
								<>
									{skills.map((skill, index) => (
										<motion.div
											key={skill.name}
											variants={skillsMotion}
											initial="hidden"
											whileInView="inView"
											whileHover="hover"
                                            transition={{ delay: index * 0.3 }}
											className="w-12 h-12 bg-slate-300/30  rounded-full overflow-hidden cursor-pointer">
											<Image
												src={skill.url}
												alt="Logo"
												width={100}
												height={100}
												placeholder="blur"
												blurDataURL={
													blurDataSkills[index]
												}
												className="scale-60"
											/>
										</motion.div>
									))}
								</>
							) : (
								<NoSkillsSkeleton />
							)}
						</motion.div>
					</motion.div>
				)}

				{checkProfile && (
					<>
						{/* Profile */}
						<motion.div
							className="relative aspect-square overflow-hidden bg-slate-700/40 dark:bg-slate-100/40 rounded-2xl w-full h-full"
							variants={imageMotion}
							initial="hidden"
							whileInView="inView">
							<motion.div
								variants={replaceMotion}
								initial="initial"
								whileHover="hover"
								whileTap="tap"
								className="absolute -bottom-2 -right-2 -translate-x-1/2 -translate-y-1/2 glassess border-glassess p-2 rounded-2xl cursor-pointer text-white"
								onClick={changeProfile}>
								<Replace size={20} className="rotate-90" />
							</motion.div>
							{isProfileLoading && <ProfileSkeleton />}
							{logo &&
								profile &&
								blurDataLogo &&
								!isProfileLoading && (
									<Image
										src={change ? profile : logo}
										width={1000}
										height={1000}
										alt="avatar"
										className="object-cover w-full h-full"
										placeholder="blur"
										blurDataURL={blurDataLogo}
									/>
								)}
						</motion.div>

						{/* Name & Title */}
						<motion.div
							className="flex flex-col items-center sm:items-start gap-1 w-full pb-2"
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
