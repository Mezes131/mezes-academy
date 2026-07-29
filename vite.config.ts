import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  // Chemins relatifs : build utilisable en double-clic (file://) ou Live Server sur dist/
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("@codesandbox") || id.includes("sandpack")) {
            return "sandpack";
          }
          if (id.includes("@supabase")) return "supabase";
          if (id.includes("@fortawesome")) return "fontawesome";
          if (id.includes("lucide-react")) return "lucide";
          if (
            id.includes("react-dom") ||
            id.includes("react-router") ||
            /[/\\]react[/\\]/.test(id)
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
