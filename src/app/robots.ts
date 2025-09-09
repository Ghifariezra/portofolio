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
                    "/static/",   // static raw file
                    "/_next/",    // asset Next.js
                    "/404",       // error pages
                    "/500",
                ],
            },
            // Googlebot (umum)
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/api/", "/server/", "/_next/"],
            },
            // Googlebot-Image (supaya gambar project masuk Google Images)
            {
                userAgent: "Googlebot-Image",
                allow: ["/images/", "/project/"],
            },
            // Bingbot (Microsoft)
            {
                userAgent: "bingbot",
                allow: "/",
                disallow: ["/api/", "/server/", "/_next/"],
            },
            // Yandex (meski jarang dipakai di ID, tapi aktif di global)
            {
                userAgent: "Yandex",
                allow: "/",
                disallow: ["/api/", "/server/", "/_next/"],
            },
            // Baidu Spider (aktif banget di Asia)
            {
                userAgent: "Baiduspider",
                allow: "/",
                disallow: ["/api/", "/server/", "/_next/"],
            },
            // Googlebot-News (tidak relevan)
            {
                userAgent: "Googlebot-News",
                disallow: "/",
            },
        ],
        sitemap: "https://www.ezdev.xyz/sitemap.xml",
        host: "https://www.ezdev.xyz",
    };
}
