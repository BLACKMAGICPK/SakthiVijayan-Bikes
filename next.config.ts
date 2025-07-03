import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.hdwallpapers.in',
      },
      {
        protocol: 'https',
        hostname: 'www.eaglerider.com',
      },
      {
        protocol: 'https',
        hostname: 'www.panalmotors.com',
      },
      {
        protocol: 'https',
        hostname: 'www.honda2wheelersindia.com',
      },
      {
        protocol: 'https',
        hostname: 'bd.gaadicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'hondabikes.goodshow.com.ua',
      },
      {
        protocol: 'https',
        hostname: 'activa.honda2wheelersindia.com',
      },
      {
        protocol: 'https',
        hostname: 'www.eshasuzuki.com',
      },
      {
        protocol: 'https',
        hostname: 'www.sagmart.com',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
      },
      {
        protocol: 'https',
        hostname: 'tse1.mm.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'tse2.mm.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'tse3.mm.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'images.91wheels.com',
      },
      {
        protocol: 'https',
        hostname: 'awtobazar.in',
      },
      {
        protocol: 'https',
        hostname: 'imgd.aeplcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.drivespark.com',
      },
    ],
  },
};

export default nextConfig;
