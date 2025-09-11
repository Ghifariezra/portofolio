import { PortfolioService } from '@/services/db'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const client = new PortfolioService()
    const projects = await client.getProjects()

    return [
        {
            url: "https://www.ezdev.xyz/",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        ...projects.map((project) => ({
            url: `https://www.ezdev.xyz/project/${project.slug}`,
            lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ]
}
