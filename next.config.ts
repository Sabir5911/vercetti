import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  
   webpack(config) {
    if (isProd) {
      config.optimization.minimizer.forEach((plugin: any) => {
        if (plugin.constructor.name === "TerserPlugin") {
          if (plugin.options.terserOptions?.compress) {
            plugin.options.terserOptions.compress.drop_console = true;
          }
        }
      });
    }
    return config;
  },


   typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
   eslint: {
    // This will ignore ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
       {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      }
    ], 
    
  },
 
};

export default nextConfig;
