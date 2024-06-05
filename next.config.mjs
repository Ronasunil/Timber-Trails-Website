/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qozrqyobcxjewzwxrsvy.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabinImages/**",
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
