"use client";

import { motion } from "motion/react";
import { SocialItems } from "@/utilities/socials/socials";
import Link from "next/link";
import Image from "next/image";
import { NoSocialsSkeleton } from "@/app/_components/common/skeleton/socials";
import { NoSkillsSkeleton } from "@/app/_components/common/skeleton/skills";
import type { AssetItem } from "@/types/response/assets";

export function ToolBox({
	className,
	check,
	data,
}: Readonly<{
	className: string;
	check: string;
	data: AssetItem[];
}>) {
	if (check == "skills") {
		return (
			<>
				{data && data.length > 0 ? (
					<>
						{data.map((dt) => (
							<motion.div
								key={dt.name}
								whileHover={{
									y: -10,
									scale: 1.1,
									transition: { duration: 0.5, ease: "easeInOut" },
								}}
								className={className}>
								<Image
									src={dt.url}
									alt="Logo"
									width={100}
									height={100}
									placeholder="blur"
									blurDataURL={dt.blurData}
									className="scale-60"
								/>
							</motion.div>
						))}
					</>
				) : (
					<NoSkillsSkeleton />
				)}
			</>
		);
	}

	return (
		<>
			{check === "social-media" &&
			data &&
			data.length > 0 ? (
				<>
					{data.map((dt, index) => (
						<motion.div
							key={dt.name}
							whileHover="hover"
							className={className}>
							{SocialItems &&
								SocialItems[index].name === dt.name && (
									<Link
										href={SocialItems[index].href}
										target="_blank">
										<Image
											src={dt.url}
											alt="Logo"
											width={100}
											height={100}
											priority
											placeholder="blur"
											blurDataURL={dt.blurData}
											className="scale-60"
										/>
									</Link>
								)}
						</motion.div>
					))}
				</>
			) : (
				<NoSocialsSkeleton />
			)}
		</>
	);
}
