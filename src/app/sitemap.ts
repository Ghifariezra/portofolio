import { PortfolioService } from '@/services/db'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const client = new PortfolioService()
    const projects = await client.getProjects()

    return [
        {
            url: "https://portofolio-jade-two.vercel.app",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        ...projects.map((project) => ({
            url: `https://portofolio-jade-two.vercel.app/project/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.8,
        })),
    ]
}
