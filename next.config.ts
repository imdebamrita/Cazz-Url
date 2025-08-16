import type { NextConfig } from "next";

import Beasties from "beasties";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Add Beasties only in production server build and only if it behaves like a Webpack plugin
    if (isServer && process.env.NODE_ENV === "production") {
      // Support both class and factory-style exports
      const BeastiesExport: any =
        (Beasties as any)?.default ?? (Beasties as any);
      let plugin: any = null;
      try {
        if (typeof BeastiesExport === "function") {
          // If it looks like a class plugin (has prototype.apply), use `new`; otherwise call as a factory
          if (
            BeastiesExport?.prototype &&
            typeof BeastiesExport.prototype.apply === "function"
          ) {
            plugin = new BeastiesExport({
              preload: "swap",
              pruneSource: true,
            });
          } else {
            plugin = BeastiesExport({
              preload: "swap",
              pruneSource: true,
            });
          }
        }
      } catch {
        plugin = null;
      }

      if (plugin && typeof plugin.apply === "function") {
        config.plugins.push(plugin);
      }
    }
    return config;
  },
};

export default nextConfig;
