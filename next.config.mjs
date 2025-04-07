/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverAction: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Accepte tous les domaines
      },
    ],
  },
};

export default nextConfig;
