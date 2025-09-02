import type { SlugProps } from "@/types/props/slug";
import { metaProject } from "@/utilities/layout/metadata";
import { Project } from "@/app/_components/common/sections/project";

export async function generateMetadata({ params }: SlugProps) {
    const { slug } = await params;
    return metaProject({ slug });
}
export default async function ProjectPage({ params }: SlugProps) {
	const { slug } = await params;

	return <Project slug={slug} />;
}
