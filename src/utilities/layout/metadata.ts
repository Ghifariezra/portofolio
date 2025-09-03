import type { Metadata } from "next";
import { PortfolioService } from "@/services/db";

const client = new PortfolioService();

const metaHome = async (): Promise<Metadata> => {
    const data = await client.getFilesWithSignedUrl("profile");
    const profile = data.find((file) => file.name === "logo");

    if (!profile) {
        return {
            title: "Ghifari Ezra",
            description: "Ghifari Ezra - Project Portfolio",
        };
    }

    return {
        title: "Ghifari Ezra Ramadhan",
        description: "Ghifari Ezra - Portfolio",
        keywords: [
            "Ghifari Ezra Ramadhan",
            "Portfolio Web Developer",
            "Fullstack Web Developer",
            "Frontend Developer React Next.js",
            "Backend Developer Express PostgreSQL",
            "TypeScript JavaScript",
            "Tailwind CSS Developer",
            "Web Developer Indonesia"
        ],
        openGraph: {
            title: "Ghifari Ezra Ramadhan",
            description: "Ghifari Ezra - Portfolio",
            url: "https://portofolio-jade-two.vercel.app/",
            images: [
                {
                    url: profile.url,
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
            images: [profile.url],
        },
    }
}

const metaProject = async ({ slug }: { slug: string }): Promise<Metadata> => {
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
                    url: project.imageUrl,
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
            images: [project.imageUrl],
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