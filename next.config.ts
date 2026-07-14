import type { NextConfig } from "next";

const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const assetsHost =
    posthogHost === "https://eu.i.posthog.com"
        ? "https://eu-assets.i.posthog.com"
        : "https://us-assets.i.posthog.com";

const nextConfig: NextConfig = {
    cacheComponents: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
    async rewrites() {
        if (!posthogHost) {
            return [];
        }

        return [
            {
                source: "/ingest/static/:path*",
                destination: `${assetsHost}/static/:path*`,
            },
            {
                source: "/ingest/array/:path*",
                destination: `${assetsHost}/array/:path*`,
            },
            {
                source: "/ingest/:path*",
                destination: `${posthogHost}/:path*`,
            },
        ];
    },
    skipTrailingSlashRedirect: true,
};

export default nextConfig;
