import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import events from 'events'

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/dnvibzwty/**",
            },
        ],
    },
    webpack: (config, { isServer }) => {
        config.plugins.push(new NodePolyfillPlugin());

        config.resolve.fallback = {
            fs: false,
            child_process: false,
            events: events 
        };

        return config;
    },
};

export default nextConfig;