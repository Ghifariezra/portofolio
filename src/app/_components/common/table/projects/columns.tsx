"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { Row } from "@tanstack/react-table";
import type { Status, Category } from "@/types/form/project";

export type Project = {
	uuid: string;
	user_id: string;
	title: string;
	description: string;
	slug: string;
	partner_team: string[];
	partner_social_media: string[];
	status: Status;
	category: Category;
	// demo: string | null;
	// image: string | null;
	// blurData: string | null;
	// created_at: string; // ISO timestamp
	// updated_at: string; // ISO timestamp
};

export const columns = (
    keys: string[],
    handleDelete: (id: string, user_id: string) => void
): ColumnDef<Project>[] => {
	const column = keys.filter(
		(key) =>
			key !== "user_id" &&
			key !== "image" &&
			key !== "blurData" &&
			key !== "demo" &&
			key !== "created_at" &&
			key !== "updated_at"
	);

	return [
		{
			id: "id",
			header: () => <p className="text-center font-bold">No</p>,
			cell: ({ row }) => <p className="text-center">{row.index + 1}</p>,
		},
		// mapping kolom lainnya
		...column.filter((key) => 
            key !== "uuid" && 
            key !== "description" &&
            key !== "slug" &&
            key !== "partner_team" &&
            key !== "partner_social_media").map((key) => ({
			header: () => (
				<p className="text-center font-bold">
					{key[0].toUpperCase() + key.slice(1)}
				</p>
			),
			accessorKey: key,
			cell: ({ row }: { row: Row<Project> }) => {
                const rawValue = row.getValue(key) as string;

                if (key === "status" || key === "category") {
                    const value = rawValue[0].toUpperCase() + rawValue.slice(1);

                    return (
						<p className="w-full bg-blue-700 rounded-full text-white text-center">
							{value}
						</p>
					);
                } else {
                    return (
                        <p className="text-left">{rawValue}</p>
                    );
                }
            },
		})),
        {
            id: "action",
            header: () => <p className="text-center font-bold">Action</p>,
            cell: ({ row }: { row: Row<Project> }) => {
                const project = row.original;

                return (
					<div className="flex justify-center">
						<Button
							onClick={() => handleDelete(project.uuid, project.user_id)}
							variant={"destructive"}
							className="cursor-pointer"
							size={"sm"}>
							Delete
						</Button>
					</div>
				);
            },
        }
	];
};