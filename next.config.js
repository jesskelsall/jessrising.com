/** @type {import('next').NextConfig} */

module.exports = {
  experimental: { scrollRestoration: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.eu-west-2.amazonaws.com",
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
  staticPageGenerationTimeout: 60,
  async redirects() {
    return [
      // {
      //   source: "/",
      //   destination: "/blog",
      //   permanent: false,
      // },
    ];
  },
};
