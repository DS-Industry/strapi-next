/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'help-desk.storage.yandexcloud.net',
            }
        ]
    }
}

module.exports = nextConfig
