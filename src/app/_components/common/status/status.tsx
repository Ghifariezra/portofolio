"use client";
import { useHomeContext } from "@/app/_components/providers/home-provider";
import { motion, AnimatePresence } from "motion/react";
import { CardAbout } from "@/app/_components/common/cards/about";
import { CardStatus } from "@/app/_components/common/cards/status";
import { SocialsSkeleton } from "@/app/_components/common/skeleton/socials";
import { ToolBox } from "@/app/_components/common/cards/toolbox";
import { DownloadCv } from "@/app/_components/ui/buttons/download";

export function ProfileStatus() {
	const { available, location, isSocialLoading, socials } = useHomeContext();

	return (
		<>
			<motion.div className="col-span-2 sm:order-1 flex flex-col-reverse sm:flex-col gap-4 h-full">
				<motion.div className="flex flex-wrap lg:flex-nowrap flex-col sm:flex-row gap-2">
					<CardStatus check="available">
						{available && (
							<motion.strong>{available}</motion.strong>
						)}
					</CardStatus>
					<CardStatus check="location">
						{location && <motion.strong>{location}</motion.strong>}
					</CardStatus>
					<CardStatus check="social-media">
						<motion.strong>Social Media:</motion.strong>
						{isSocialLoading ? (
							<SocialsSkeleton />
						) : (
							<AnimatePresence mode="sync">
								<ToolBox
									data={socials}
									check="social-media"
									className="w-8 h-8 bg-slate-300/30  rounded-full overflow-hidden"
								/>
							</AnimatePresence>
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
