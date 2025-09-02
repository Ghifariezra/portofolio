import type { SlugProps } from "@/types/props/slug";
import { getProjectBySlug } from "@/utilities/project/slug";
import { metaProject } from "@/utilities/layout/metadata";
import { Project } from "@/app/_components/common/sections/project";

export const generateMetadata = metaProject;

export default async function ProjectPage({ params }: SlugProps) {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	return <Project project={project} />;
}
