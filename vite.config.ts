import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  worker: {
    format: "es",
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/framer-motion/")) {
            return "framer-motion";
          }
          if (id.includes("node_modules/@sentry/browser/")) {
            return "sentry";
          }
          if (id.includes("node_modules/@react-pdf/renderer/") || id.includes("src/components/cv/") || id.includes("src/utils/cvGenerator")) {
            return "pdf-vendor";
          }
        },
      },
    },
  },
});
