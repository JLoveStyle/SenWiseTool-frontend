/** @type {import('next').NextConfig} */
const nextConfig = {
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
