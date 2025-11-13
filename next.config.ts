import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/**', // Permite todas las rutas de imagen de este dominio
      },
    ],
  },
};

export default nextConfig;