import type { Metadata } from "next";
import { SlugProps } from "@/types/props/slug";
import { getProjectBySlug } from "@/utilities/project/slug";

const metaHome: Metadata = {
    title: "Ghifari Ezra Ramadhan",
    description: "Ghifari Ezra - Portfolio",
};

const metaProject = async ({ params }: SlugProps): Promise<Metadata> => {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

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
                    url: project.image,
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
            images: [project.image],
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