"use client";

import { useHomeContext } from "@/app/_components/providers/home-provider";
import { motion, AnimatePresence } from "motion/react";
import { useDirect } from "@/hooks/useDirect";
import Image from "next/image";
import { memo } from "react";
import { LogoSkeleton, NoLogoSkeleton } from "@/app/_components/common/skeleton/logo";

function Logo() {
	const { logoData } = useHomeContext();
	const {
		containerMotion,
		nameMotion,
		logoName,
		imageMotion,
		logo,
		isProfileLoading,
	} = logoData;
	
	const { goHome } = useDirect();

	return (
		<motion.div
			key={logoName}
			variants={containerMotion}
			initial="hidden"
			animate="visible"
			exit="hidden"
			onClick={goHome}
			className="cursor-pointer select-none flex items-center gap-2">
			<motion.div
				variants={imageMotion}
				initial="hidden"
				animate="visible"
				exit="hidden"
				className="aspect-square w-8 h-8 rounded-full overflow-hidden border border-slate-700/10 dark:border-slate-100/10 relative">
				{isProfileLoading ? (
					<LogoSkeleton />
				) : (
					logo ? (
						<Image
							src={logo.url}
							width={500}
							height={500}
							alt="logo"
							priority
							placeholder="blur"
							blurDataURL={logo.blurDataUrl}
						/>
					): (
						<NoLogoSkeleton />
					)
				)}
			</motion.div>
			<motion.div className="relative hidden lg:block sm:break-all">
				<AnimatePresence mode="sync" initial={true}>
					{logoName.split("").map((word, index) => (
						<motion.span
							key={index}
							variants={nameMotion}
							className="text-sm sm:text-lg font-semibold">
							{word}
						</motion.span>
					))}
				</AnimatePresence>
			</motion.div>
		</motion.div>
	);
}

export default memo(Logo);
