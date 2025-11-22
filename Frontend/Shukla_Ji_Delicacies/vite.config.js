import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/signUp": "http://localhost:5000",
      "/login": "http://localhost:5000",
      "/recipe": "http://localhost:5000"
    }
  }
});
