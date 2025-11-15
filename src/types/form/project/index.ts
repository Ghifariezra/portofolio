import { z } from "zod";
import { schemaFormProject } from "@/utilities/schema/form/project";

export type FormSchemaProject = z.infer<typeof schemaFormProject>;

export type FormSchemaProjectUpdate = FormSchemaProject & {
    user_id: string;
};

export type Status = "default" | "individual" | "collaboration";
export type Category = "default" | "data" | "web" | "ui/ux" | "telegram";

export type DeleteProject = {
    id: string;
    user_id: string;
};