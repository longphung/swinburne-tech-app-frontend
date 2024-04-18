import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
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
      output: {
        manualChunks(id) {
          const chunkList = [
            "@mui",
            "@refinedev/mui",
            "material-ui-confirm"
          ]
          let result: string | void;
          chunkList.forEach((chunk) => {
            if (id.includes(chunk)) {
              result = chunk;
            }
          });
          return result;
        },
      },
    },
  },
});
