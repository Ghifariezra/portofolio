"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Status, Category } from "@/types/form/project";

export type Project = {
	// uuid: string;
	// user_id: string;
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

export const columns = (keys: string[]): ColumnDef<Project>[] => {
	const column = keys.filter(
		(key) =>
			key !== "uuid" &&
			key !== "user_id" &&
			key !== "image" &&
			key !== "blurData" &&
			key !== "demo" &&
			key !== "created_at" &&
			key !== "updated_at"
	);

	return [
		// ✅ tambahin kolom id di awal
		{
			id: "id",
			header: () => <strong className="text-center">No</strong>,
			cell: ({ row }) => row.index + 1,
		},
		// mapping kolom lainnya
		...column.map((key) => ({
			header: () => (
				<strong className="text-center">
					{key[0].toUpperCase() + key.slice(1)}
				</strong>
			),
			accessorKey: key,
		})),
	];
};