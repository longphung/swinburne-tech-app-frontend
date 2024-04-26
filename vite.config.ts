import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// eslint-disable-next-line max-lines-per-function
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE");

  return {
    base: env.VITE_BASE_URL,
    plugins: [
      tsconfigPaths(),
      react(),
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
