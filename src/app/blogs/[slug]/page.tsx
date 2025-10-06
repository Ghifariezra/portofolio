import type { SlugProps } from "@/types/props/slug";
import { metaBlog } from "@/utilities/layout/metadata";
import { BlogDetail } from "@/app/_components/common/sections/blogs/blogDetail";

export async function generateMetadata({ params }: SlugProps) {
    const { slug } = await params;
    return metaBlog({ slug });
}

export default async function BlogPage({ params }: SlugProps) {
    const { slug } = await params;

    return <BlogDetail slug={slug} />;
}
