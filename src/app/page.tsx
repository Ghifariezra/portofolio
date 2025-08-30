"use client";
import Hero from "@/app/_components/common/sections/hero";
import About from "@/app/_components/common/sections/about";
import Project from "@/app/_components/common/sections/project";

export default function Home() {
	return (
		<main className="flex flex-col w-full">
			<Hero />
			<About />
			<Project />
		</main>
	);
}
