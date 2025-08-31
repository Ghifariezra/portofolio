"use client";

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

export function Avatars({ contributors }: AvatarsProps) {
	return (
		<motion.div className="flex items-center gap-2">
			<motion.span className="text-sm font-semibold">
				Contributors:
			</motion.span>
			{contributors.length > 0 && (
				<motion.div className="flex -space-x-3">
					{contributors.map((name: string, index: number) => (
						<Tooltip key={index}>
							<TooltipTrigger asChild>
								<Avatar className="cursor-help">
									<AvatarImage src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-02-128.png" />
									<AvatarFallback>{name[0]}</AvatarFallback>
								</Avatar>
							</TooltipTrigger>
							<TooltipContent side="top">{name}</TooltipContent>
						</Tooltip>
					))}
				</motion.div>
			)}
		</motion.div>
	);
}
