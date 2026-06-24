import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mom.gov.et",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nomadsinn.com",
        port: "",
        pathname: "/momp/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "10.0.71.61:8080",
        "localhost:8080",
        "mom.gov.et:8080",
        "172.31.102.106:8080",
        "10.0.71.61",
        "mom.gov.et",
        "172.31.102.106"
      ]
    }
  }
};

export default withNextIntl(nextConfig);
