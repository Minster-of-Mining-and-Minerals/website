import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {  images: {
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
