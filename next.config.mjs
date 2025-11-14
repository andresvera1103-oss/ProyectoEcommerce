/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.dummyjson.com', // 👈 Nueva fuente de imágenes
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'fakestoreapi.com', // Dejamos la anterior por si acaso
          port: '',
          pathname: '/**',
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
  export default nextConfig;