import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    // https: {
    //   key: "./esol-privateKey.key",
    //   cert: "./esol.crt",
    // },
    host: "0.0.0.0",
    port: 3000, // Cambia esto si prefieres usar otro puerto
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
