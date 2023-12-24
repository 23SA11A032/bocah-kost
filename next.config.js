/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                "https://congenial-chainsaw-q77466ww9q79255x-3000.app.github.dev/",
                "localhost:3000",
            ],
        },
    },
};

module.exports = nextConfig;
