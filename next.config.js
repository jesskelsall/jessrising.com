/** @type {import('next').NextConfig} */

module.exports = {
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
