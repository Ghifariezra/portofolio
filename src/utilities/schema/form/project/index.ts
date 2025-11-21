import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const schemaFormProject = z.object({
    title: z
        .string()
        .min(2, {
            message: "Title must be at least 2 characters.",
        })
        .nonempty(),
    description: z.string().optional(),
    slug: z.string().nonempty(),
    partner_team: z.array(
        z.object({
            name: z.string(),
        })
    ),
    partner_social_media: z.array(
        z.object({
            url: z.string(),
        })
    ),
    image: z
        .instanceof(File, { message: "Image is required." })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "Image size should be less than 5 MB.",
        }),
    demo: z.string().url().optional(),
    video_url: z.string().optional(),
    status: z.enum(["individual", "collaboration", "default"]),
    category: z.enum(["web", "data", "ui/ux", "telegram", "default", "gui"]),
});

export { schemaFormProject };