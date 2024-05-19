import { defineConfig, loadEnv, normalizePath } from "vite";
import { createRequire } from 'node:module';
import path from 'node:path';
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from 'vite-plugin-static-copy';

const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps'),
);
const standardFontsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'standard_fonts'),
);

// eslint-disable-next-line max-lines-per-function
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE");

  return {
    base: env.VITE_BASE_URL,
    plugins: [
      tsconfigPaths(),
      react(),
      viteStaticCopy({
        targets: [
          { src: cMapsDir, dest: '' },
          { src: standardFontsDir, dest: '' },
        ],
      }),
      VitePWA({
        includeAssets: [
          "favicon.ico",
          "robots.txt",
          "apple-icon.png",
          "android-chrome-192x192.png",
          "android-chrome-512x512.png",
          "maskable_icon_x512.png",
        ],
        registerType: "autoUpdate",
        manifest: {
          name: "TechAway - Business IT Support",
          short_name: "TechAway",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          start_url: env.VITE_BASE_URL,
          icons: [
            {
              src: `${env.VITE_BASE_URL}/android-chrome-192x192.png`,
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: `${env.VITE_BASE_URL}/android-chrome-512x512.png`,
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: `${env.VITE_BASE_URL}/apple-icon.png`,
              sizes: "180x180",
              type: "image/png",
            },
            {
              src: `${env.VITE_BASE_URL}/maskable_icon_x512.png`,
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
      }),
    ],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {},
      },
    },
  };
});
