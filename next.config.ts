import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let the dev server be reached from any device on the network, not just
  // localhost. "*.*.*.*" matches any IPv4 address; "**.local" / "**.lan" cover
  // mDNS / router hostnames. Dev-only; production is unaffected.
  allowedDevOrigins: ["*.*.*.*", "**.local", "**.lan", "**.home", "**.internal"],
};

export default nextConfig;
