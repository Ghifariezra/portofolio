"use client";

import { useMemo } from "react";
import { useHomeContext } from "@/app/_components/providers/home-provider";
import { DataTable } from "@/app/_components/common/table/projects/dataTable";
import {
	columns,
	type Project,
} from "@/app/_components/common/table/projects/columns";
import { TableSkeleton } from "@/app/_components/common/skeleton/projects/table";
import type { Status, Category } from "@/types/form/project";

export default function ListProjects() {
	const { projectData } = useHomeContext();
	const { projects, isProjectLoading, handleDelete } = projectData;

	const normalizedProjects: Project[] = useMemo(() => {
		if (!projects) return [];

		return projects.map((project) => ({
			uuid: project.uuid,
			user_id: project.user_id,
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
	}, [projects]);

	if (isProjectLoading) {
		return (
            <div className="flex flex-col gap-8 min-h-screen pt-28 pb-6 px-6">
                <div className="flex flex-col gap-4">
                    <TableSkeleton />
                </div>
            </div>
        );
	}

	const resultColumns = columns(Object.keys(projects[0]), handleDelete);

	return (
		<div className="flex flex-col gap-8 min-h-screen pt-28 pb-6 px-6">
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold">Projects</h1>
				<DataTable columns={resultColumns} data={normalizedProjects} />
			</div>
		</div>
	);
}
