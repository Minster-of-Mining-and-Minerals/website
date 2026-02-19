import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'], // allow images from localhost
  },
};

export default withNextIntl(nextConfig);
