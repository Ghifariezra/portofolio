import type { Metadata } from "next";
import { PortfolioService } from "@/services/db";

const metaHome: Metadata = {
    title: "Ghifari Ezra Ramadhan",
    description: "Ghifari Ezra - Portfolio",
    openGraph: {
        title: "Ghifari Ezra Ramadhan",
        description: "Ghifari Ezra - Portfolio",
        url: "https://portofolio-jade-two.vercel.app/",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}profile/logo.webp`,
                width: 1200,
                height: 630,
                alt: "Ghifari Ezra Ramadhan",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ghifari Ezra Ramadhan",
        description: "Ghifari Ezra - Portfolio",
        images: [`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}profile/logo.webp`],
    },
};

const metaProject = async ({ slug }: { slug: string }): Promise<Metadata> => {
    const client = new PortfolioService();
    const project = await client.getProjectBySlug(slug);

    if (!project) {
        return {
            title: "Project Not Found | Ghifari Ezra",
            description: "The project you are looking for does not exist.",
        };
    }

    return {
        title: `${project.title} | Ghifari Ezra`,
        description:
            project.description?.slice(0, 150) ||
            "Ghifari Ezra - Project Portfolio",
        openGraph: {
            title: project.title,
            description: project.description?.slice(0, 150),
            url: `https://portofolio-jade-two.vercel.app/project/${slug}`,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${project.image}`,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.description?.slice(0, 150),
            images: [`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${project.image}`],
        },
    };
}

const metaNotFound: Metadata = {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist.",
};

export {
    metaHome,
    metaNotFound,
    metaProject
};