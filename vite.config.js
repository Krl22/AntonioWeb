import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

export default defineConfig({
  server: {
    https: {
      key: "./esol-privateKey.key",
      cert: "./esol.crt",
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "ESOL",
        short_name: "ESOL",
        description: "English Learning Platform",
        start_url: "/",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#ffffff", // Use lower case hex color code
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      devOptions: {
        enabled: true, // Habilitar PWA en entorno de desarrollo
        type: "module", // Usar 'module' para asegurar compatibilidad con la sintaxis moderna
      },
    }),
  ],
});
