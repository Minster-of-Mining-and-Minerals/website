import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  images: {
    domains: ['localhost'], // allow images from localhost
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nomadsinn.com",
        port: "",
        pathname: "/momp/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
