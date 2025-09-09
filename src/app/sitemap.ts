import { PortfolioService } from '@/services/db'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const client = new PortfolioService()
    const projects = await client.getProjects()

    return [
        {
            url: "https://www.ezdev.xyz/",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        ...projects.map((project) => ({
            url: `https://www.ezdev.xyz/project/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.8,
        })),
    ]
}
