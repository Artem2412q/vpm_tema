/** @type {import('next').NextConfig} */
const nextConfig = {
  // Для GitHub Pages / статического хостинга можно оставить export.
  // Если вам нужен серверный рендеринг на Vercel — удалите output/trailingSlash.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
