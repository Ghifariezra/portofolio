import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PortfolioService } from "@/services/db";
import { verifyLoginToken } from "@/utilities/auth/login";
import { verifyCsrfToken } from "@/utilities/csrf/csrf";
import type { SlugProps } from "@/types/props/slug";
import type {
    Status,
    Category,
} from "@/types/form/project";

export async function POST(req: Request, { params }: SlugProps) {
    const csrfToken = (await cookies()).get("csrfToken")?.value || "";

    if (!csrfToken) {
        return NextResponse.json({ error: "Missing CSRF token" }, { status: 403 });
    }

    const valid = await verifyCsrfToken(csrfToken);

    if (!valid) {
        return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
    }

    const token = (await cookies()).get("authToken")?.value;

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const slug = (await params).slug;

    const check = new PortfolioService();

    const user = await verifyLoginToken(token);

    if (!user) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const {
        uuid,
        username,
        role
    } = await check.getUsers(user.username);

    if (!username) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    switch (slug) {
        case "project":
            const form = await req.formData();
            console.log(form);
            const rawData = Object.fromEntries(form);

            const img = rawData.image as File;
            if (!img) {
                return NextResponse.json({ error: "Missing project image" }, { status: 400 });
            }

            const {
                partner_team,
                partner_social_media,
                ...dataProject
            } = {
                title: rawData.title as string,
                description: rawData.description as string,
                slug: rawData.slug as string,
                demo: rawData.demo as string,
                status: rawData.status as Status,
                category: rawData.category as Category,
                partner_team: rawData.partner_team ? JSON.parse(rawData.partner_team as string) : [],
                partner_social_media: rawData.partner_social_media ? JSON.parse(rawData.partner_social_media as string) : [],
                image: img
            };

            if (!dataProject) {
                return NextResponse.json({ error: "Missing project data" }, { status: 400 });
            }

            const teams = partner_team.map((team: { name: string }) => team.name);
            const socialMedia = partner_social_media.map((socialMedia: { url: string }) => socialMedia.url);

            const finalResult = {
                user_id: uuid,
                partner_team: teams,
                partner_social_media: socialMedia,
                ...dataProject,
            };

            const result = await check.createProject(finalResult);

            return NextResponse.json({
                message: result
            }, { status: 200 });
        
        case "blog":
            const formBlog = await req.formData();

            if (!formBlog) {
                return NextResponse.json({ error: "Missing blog data" }, { status: 400 });
            }

            const rawDataBlog = Object.fromEntries(formBlog);

            const imgBlog = rawDataBlog.image as File;
            if (!imgBlog) {
                return NextResponse.json({ error: "Missing blog image" }, { status: 400 });
            }

            const payloadBlog = {
                user_id: uuid,
                title: rawDataBlog.title as string,
                description: rawDataBlog.description as string,
                slug: rawDataBlog.slug as string,
                language: rawDataBlog.language as string,
                content: rawDataBlog.content as string,
                image: imgBlog
            };

            console.log(payloadBlog);

            if (!payloadBlog) {
                return NextResponse.json({ error: "Missing blog data" }, { status: 400 });
            }

            const resultBlog = await check.createBlog(payloadBlog);

            return NextResponse.json({
                message: resultBlog
            }, { status: 200 });

        default:
            return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

}