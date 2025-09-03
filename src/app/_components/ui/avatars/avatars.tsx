"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/app/_components/ui/avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import type { AvatarsProps } from "@/types/props/avatars";

export function Avatars({ contributors, socialMedia }: AvatarsProps) {
	const checkContributors = contributors?.length > 0 ? true : false;
	const checkSocial = socialMedia && socialMedia.length > 0;

	return (
		<>
			{checkContributors && checkSocial && (
				<motion.div className="flex items-center gap-2">
					<motion.span className="text-sm font-semibold">
						Contributors:
					</motion.span>
					<motion.div className="flex -space-x-3">
						{contributors.map((name: string, index: number) => (
							<Tooltip key={index}>
								<TooltipTrigger asChild>
									<Link
										href={socialMedia[index]}
										target="_blank">
										<Avatar className="cursor-help">
											<AvatarImage src="https://cdn1.iconfinder.com/data/icons/facely-metapeople-3d-avatar-set/256/7._Asia_Woman.png" />
											<AvatarFallback>
												{name[0]}
											</AvatarFallback>
										</Avatar>
									</Link>
								</TooltipTrigger>
								<TooltipContent side="top">
									{name}
								</TooltipContent>
							</Tooltip>
						))}
					</motion.div>
				</motion.div>
			)}
		</>
	);
}
