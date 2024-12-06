/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_WORLDCOIN_APP_ID: '',
        NEXT_PUBLIC_PROJECT_ID: '',
        NEXT_PUBLIC_APP_URL: 'https://hedera-for-robotics.vercel.app',
        NEXT_PUBLIC_EXPLORER: 'https://hashscan.io/testnet',

        FIREBASE_MAIL: '',
        FIREBASE_PASSWORD: '',
        PROVIDER:
            '',
        OWNER_PK: '',
    },
};

export default nextConfig;
