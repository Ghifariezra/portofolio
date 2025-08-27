import Hero from "@/app/components/common/sections/hero";
import About from "@/app/components/common/sections/about";
import Project from "@/app/components/common/sections/project";

export default function Home() {
	return (
		<main className="flex flex-col w-full">
			<Hero />
			<About />
			<Project />
		</main>
	);
}
