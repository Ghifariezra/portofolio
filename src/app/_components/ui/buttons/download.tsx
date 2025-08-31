"use client";
import { motion } from "motion/react";
import { CloudDownload, Loader } from "lucide-react";
import type { ClassNameProps } from "@/types/props/className";
import { useHomeContext } from "@/app/_components/providers/home-provider";
import { Button } from "@/app/_components/ui/button";

export function DownloadCv({ className }: ClassNameProps) {
	const cv =
		"https://drive.google.com/uc?export=download&id=1YCvYiw2lnNKDihbfp6BYJa5MTZllUPCU";

	const { 
		handleDownload, 
		loadDownload, 
	} = useHomeContext();

	return (
		<motion.div
			whileTap={{
				scale: loadDownload ? 1 : 0.9,
			}}
			transition={{ type: "spring", stiffness: 80, damping: 15 }}
			className={`${className} flex-col w-full items-center sm:items-start gap-4`}>
			<Button
				onClick={() => handleDownload(cv)}
				disabled={loadDownload}
				className="flex items-center justify-center gap-2 font-bold w-fit sm:w-full cursor-pointer">
				{loadDownload ? (
					<>
						<Loader className="animate-spin" />
						Loading...
					</>
				) : (
					<>
						<CloudDownload />
						Download CV
					</>
				)}
			</Button>
		</motion.div>
	);
}
