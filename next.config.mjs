/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Add rule to handle SVG files with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
