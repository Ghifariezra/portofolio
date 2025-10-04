'use client'

import { useHomeContext } from "@/app/_components/providers/home-provider";
import { DataTable } from "@/app/_components/common/table/projects/dataTable";
import { columns, type Project } from "@/app/_components/common/table/projects/columns";
import type {
    Status,
    Category,
} from "@/types/form/project";

export default function ListProjects() {
    const { projectData } = useHomeContext();
    const { projects, isProjectLoading } = projectData;

    if (isProjectLoading) {
        return <div>Loading...</div>;
    }

    const normalizedProjects: Project[] = projects.map((project) => ({
		title: project.title,
		description: project.description,
		slug: project.slug,
		partner_team: project.partner_team,
		partner_social_media: project.partner_social_media,
		status:
			project.status === "default"
				? "default"
				: (project.status as Status),
		category: (
			["default", "data", "web", "ui/ux", "telegram"] as const
		).includes(project.category as Category)
			? (project.category as Category)
			: "default",
	}));
    const resultColumns = columns(Object.keys(projects[0]));

    return (
        <div className="flex flex-col gap-8 min-h-screen pt-28 pb-6 px-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Projects</h1>
                <DataTable columns={resultColumns} data={normalizedProjects} />
            </div>
        </div>
    );
}