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
      {
        source: "/new",
        destination: "/gallery?tag=new",
        permanent: true,
      },
      {
        source: "/reindeer",
        destination: "/gallery?tag=reindeer",
        permanent: false,
      },
    ];
  },
};
