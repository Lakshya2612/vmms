import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://vmms-kg7v.onrender.com",
    },
  },
  plugins: [react()],
});
