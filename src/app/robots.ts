import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // aturan umum untuk semua crawler
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",      // API internal
                    "/server/",   // server-side route
                    "/404",       // error pages
                    "/500",
                ],
            },
            // Googlebot-Image (supaya gambar project masuk Google Images)
            {
                userAgent: "Googlebot-Image",
                allow: ["/images/", "/project/"],
            },
            // Googlebot-News (tidak relevan)
            {
                userAgent: "Googlebot-News",
                disallow: "/",
            },
        ],
        sitemap: "https://www.ezdev.xyz/sitemap.xml",
    };
}
