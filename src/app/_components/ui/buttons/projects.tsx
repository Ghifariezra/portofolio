"use client";

import { motion } from "motion/react";
import { Button } from "@/app/_components/ui/button";
import { BookCheck, CircleArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export function ButtonProjects({ url, slug }: { url: string, slug: string }) {
	return (
		<motion.div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
			{url.length > 0 && slug.length > 0 ? (
				<>
					{/* Button */}
					<motion.div
						whileTap={{
							scale: 0.9,
						}}
						transition={{
							type: "spring",
							stiffness: 80,
							damping: 15,
						}}
						className="w-full flex justify-center">
						<Button variant={"outline"} asChild>
							<Link
								href={`/project/${slug}`}
								className="flex items-center !bg-transparent hover:!bg-gray-200/30 hover:dark:!bg-slate-200/10 gap-2 cursor-pointer w-full"
								prefetch>
								<motion.div className="relative">
									<BookCheck size={24} strokeWidth={2} />
								</motion.div>
								<motion.strong>Read more</motion.strong>
							</Link>
						</Button>
					</motion.div>

					{/* Demo */}
					<motion.div
						whileTap={{
							scale: 0.9,
						}}
						transition={{
							type: "spring",
							stiffness: 80,
							damping: 15,
						}}
						className="w-full flex justify-center">
						<Button variant={"outline"} asChild>
							<Link
								href={url}
								target="_blank"
								className="flex items-center gap-2 cursor-pointer hover:!bg-gray-200/30 hover:dark:!bg-slate-200/10 !bg-transparent w-full">
								<motion.div className="relative">
									<CircleArrowOutUpRight
										size={24}
										strokeWidth={2}
									/>
								</motion.div>
								<motion.strong>View Demo</motion.strong>
							</Link>
						</Button>
					</motion.div>
				</>
			) : (
				<motion.div
					whileTap={{
						scale: 0.9,
					}}
					transition={{
						type: "spring",
						stiffness: 80,
						damping: 15,
					}}
					className="w-full flex justify-end">
					<Button variant={"outline"} asChild>
						<Link
							href={`/project/${slug}`}
							className="flex items-center !bg-transparent hover:!bg-gray-200/30 hover:dark:!bg-slate-200/10 gap-2 cursor-pointer" prefetch>
							<motion.div className="relative">
								<BookCheck size={24} strokeWidth={2} />
							</motion.div>
							<motion.strong>Read more</motion.strong>
						</Link>
					</Button>
				</motion.div>
			)}
		</motion.div>
	);
}
