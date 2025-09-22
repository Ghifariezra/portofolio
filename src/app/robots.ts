import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",      // API internal (kecuali asset)
                    "/server/",   // server-side route
                    "/404",       // error pages
                    "/500",
                ],
            },
            {
                userAgent: "Googlebot",
                allow: ["/api/assets"],
            },
            {
                userAgent: "Googlebot-Image",
                allow: ["/images/", "/project/", "/api/assets"], // izinkan gambar
            },
            {
                userAgent: "Googlebot-News",
                disallow: "/",
            },
        ],
        sitemap: "https://www.ezdev.xyz/sitemap",
    };
}
