/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    dirs: ["src", "tests"]
  },
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
        source: "/foryou",
        destination: "/gallery?tag=for-you&order=oldest",
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
