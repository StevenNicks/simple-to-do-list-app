import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let the dev server be reached from any device on the LAN via the host's
  // IPv4 address, not just localhost. "*.*.*.*" only matches 4-segment hosts,
  // i.e. IPv4 addresses — regular domains are unaffected.
  allowedDevOrigins: ["*.*.*.*"],
};

export default nextConfig;
