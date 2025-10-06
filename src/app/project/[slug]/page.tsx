import type { SlugProps } from "@/types/props/slug";
import { metaProject } from "@/utilities/layout/metadata";
import { ProjectDetail } from "@/app/_components/common/sections/projects/ProjectDetail";

export async function generateMetadata({ params }: SlugProps) {
    const { slug } = await params;
    return metaProject({ slug });
}

export default async function ProjectPage({ params }: SlugProps) {
	const { slug } = await params;

	return <ProjectDetail slug={slug} />;
}
