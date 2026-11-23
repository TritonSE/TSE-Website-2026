import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // App lives in frontend/; pin Turbopack's root here so it stops
  // inferring a workspace root from stray lockfiles elsewhere.
  turbopack: { root: __dirname },
};

export default nextConfig;
