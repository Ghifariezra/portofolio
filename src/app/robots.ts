import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // aturan default untuk semua crawler
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",       // blok semua endpoint API
                    "/server/",    // server-side route
                    "/404",        // error pages
                    "/500",
                ],
            },

            // pengecualian: izinkan akses assets lewat API (khusus Googlebot)
            {
                userAgent: "Googlebot",
                allow: ["/api/assets"],
            },

            // Google Images crawler (supaya gambar bisa masuk Google Images)
            {
                userAgent: "Googlebot-Image",
                allow: ["/images/", "/project/", "/api/assets"],
            },

            // Google News crawler (tidak relevan untuk site ini)
            {
                userAgent: "Googlebot-News",
                disallow: "/",
            },
        ],

        sitemap: "https://www.ezdev.xyz/sitemap.xml",
    };
}
