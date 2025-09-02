import { cookies } from "next/headers";

export async function getProjectBySlug(slug: string) {
    const URL = process.env.NEXT_PUBLIC_API_URL;

    const cookieStore = await cookies();
    const csrfToken = cookieStore.get("csrfToken")?.value ?? "";

    const data = await fetch(`${URL}/projects/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Cookie: `csrfToken=${csrfToken}`,
        },
        cache: "no-store",
    });

    return await data.json();
}