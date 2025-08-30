"use client";
import Image from "next/image";
import { useHomeContext } from "@/app/_components/providers/home-provider";
import { motion, AnimatePresence } from "motion/react";
import { CardAbout } from "@/app/_components/common/cards/about";
import { CardStatus } from "@/app/_components/common/cards/status";
import {
	SocialsSkeleton,
	NoSocialsSkeleton,
} from "@/app/_components/common/skeleton/socials";
import { SocialItems } from "@/utilities/socials/socials";
import Link from "next/link";
import { DownloadCv } from "@/app/_components/ui/download/button";

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
	} = useHomeContext();

	return (
		<>
			<motion.div
				initial="hidden"
				whileInView="inView"
				variants={containerTitleMotion}
				className="col-span-2 sm:order-1 flex flex-col-reverse sm:flex-col gap-4 h-full">
				<motion.div className="flex flex-wrap lg:flex-nowrap flex-col sm:flex-row gap-2">
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
						<strong>Social Media:</strong>
						{isSocialLoading ? (
							<SocialsSkeleton />
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
										className="w-8 h-8 bg-slate-300/30  rounded-full overflow-hidden">
										{SocialItems &&
											SocialItems[index].name ===
												social.name && (
												<Link
													href={
														SocialItems[index].href
													}
													target="_blank">
													<Image
														src={social.url}
														alt="Logo"
														width={100}
														height={100}
														placeholder="blur"
														blurDataURL={
															blurDataSocial[
																index
															]
														}
														className="scale-60"
													/>
												</Link>
											)}
									</motion.div>
								))}
							</AnimatePresence>
						) : (
							<NoSocialsSkeleton />
						)}
					</CardStatus>
				</motion.div>
				<CardAbout checkSkills={true} className="max-w-full p-6" />
				<CardAbout checkDesc={true} className="max-w-full h-full p-6" />
				<DownloadCv className="hidden sm:flex" />
			</motion.div>
			<CardAbout
				checkProfile={true}
				className="w-full h-full col-span-1 p-1 sm:p-2"
			/>
		</>
	);
}
