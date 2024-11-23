// next.config.mjs
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withPWA({
  dest: 'public',       // Service worker aur caching files ko "public" folder mein save karta hai
  register: true,       // Automatically service worker ko register karta hai
  skipWaiting: true,    // Naye updates ke liye purani service worker ko wait nahi karata
  ...nextConfig,        // Extra Next.js configuration
});
