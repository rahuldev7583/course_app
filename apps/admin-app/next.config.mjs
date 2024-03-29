/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  env: {
    API_URL: "http://localhost:5000/admin",
  },
};

export default nextConfig;
