import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@mui")) {
            return "vendor_mui";
          }
          if (id.includes("@refinedev/mui")) {
            console.log('id', id)
            return "vendor_refinedev_mui";
          }
        },
      },
    },
  },
});
