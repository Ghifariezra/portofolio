"use client";

import { motion } from "motion/react";
import { memo } from "react";
import { CardBlogs } from "@/app/_components/common/cards/blogs";
import { useHomeContext } from "@/app/_components/providers/home-provider";

function Blogs() {
	const { blogsData } = useHomeContext();
	const { containerMotion } = blogsData;

	return (
		<motion.section
			id="blogs"
			variants={containerMotion}
			initial="hidden"
			animate="visible"
			whileInView="visible"
			className="flex flex-col py-6 px-6 gap-6">
			<h2 className="text-2xl font-bold">Blogs</h2>
			<CardBlogs />
		</motion.section>
	);
}

export default memo(Blogs);
