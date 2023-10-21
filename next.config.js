/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "*.cloudfront.net",
      "googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.openai.com",
      "*",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

//stripe listen --forward-to localhost:3000/api/webhook
