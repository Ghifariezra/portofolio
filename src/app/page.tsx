"use client";
import Hero from "@/app/_components/common/sections/hero";
import About from "@/app/_components/common/sections/about";
import Projects from "@/app/_components/common/sections/projects/projects";
import Blogs from "@/app/_components/common/sections/blogs/blogs";
import Certificates from "@/app/_components/common/sections/certificates";

export default function Home() {
	return (
		<main className="flex flex-col w-full">
			<Hero />
			<About />
			<Projects />
			<Blogs />
			<Certificates />
		</main>
	);
}
