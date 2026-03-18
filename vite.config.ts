import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  worker: {
    format: "es",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-vendor";
          }
          if (id.includes("node_modules/framer-motion/")) {
            return "framer-motion";
          }
          if (id.includes("node_modules/@sentry/browser/")) {
            return "sentry";
          }
          if (id.includes("node_modules/@react-pdf/renderer/")) {
            return "pdf-vendor";
          }
        },
      },
    },
  },
});
