/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"]
  },
  webpack(config) {
    // Configura Webpack para ignorar el módulo 'fs'
    config.resolve.fallback = {
      fs: false
    };

    // Devuelve la configuración modificada
    return config;
  }
};

export default nextConfig;
