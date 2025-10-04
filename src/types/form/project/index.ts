import { z } from "zod";
import { schemaFormProject } from "@/utilities/schema/form/project";

export type FormSchemaProject = z.infer<typeof schemaFormProject>;

export type FormSchemaProjectUpdate = FormSchemaProject & {
    user_id: string;
};