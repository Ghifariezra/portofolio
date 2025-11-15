import { z } from "zod";
import { schemaFormBlog } from "@/utilities/schema/form/blogs";

export type FormSchemaBlog = z.infer<typeof schemaFormBlog>;

export type FormSchemaBlogUpdate = FormSchemaBlog & {
    user_id: string;
};

export type BlogSlug = { slug: string };
export type DeleteBlog = { id: string; user_id: string };