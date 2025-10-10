import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const schemaFormBlog = z.object({
    title: z.string().
        min(2, {
            message: "Username must be at least 2 characters.",
        }),
    description: z.string().
        min(2, {
            message: "Content must be at least 2 characters."
        }),
    image: z
            .instanceof(File, { message: "Image is required." })
            .refine((file) => file.size <= MAX_FILE_SIZE, {
                message: "Image size should be less than 5 MB.",
            }),
    slug: z.string().
        min(2, {
            message: "Content must be at least 2 characters."
        }),
    language: z.string().
        min(2, {
            message: "Content must be at least 2 characters."
        }),
    content: z.string().
        min(2, {
            message: "Content must be at least 2 characters."
        }),
});

export { schemaFormBlog };