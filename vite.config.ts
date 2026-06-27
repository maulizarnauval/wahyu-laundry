// vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(), 
    reactRouter(),
  ],

  // 🚀 OPTIMALISASI SSR & SSG PRE-RENDERING
  ssr: {
    noExternal: ["lucide-react", "react-leaflet", "leaflet", "@lottiefiles/dotlottie-react", "framer-motion"],
    target: "node",
  },

  build: {
    cssMinify: "lightningcss", // Memaksimalkan kompresi CSS native v4
    reportCompressedSize: false, // Mempercepat proses build di lingkungan produksi
    minify: true, // 🌟 REKOMENDASI UTAMA: Menggunakan kompresi internal native yang stabil dan aman di Vercel
    
    rollupOptions: {
      output: {
        // ⚡ STRATEGI CACHING BERLAPIS
        manualChunks(id) {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/react-router/")) {
            return "react-core";
          }
          if (id.includes("node_modules/leaflet") || id.includes("node_modules/react-leaflet")) {
            return "leaflet-maps";
          }
          if (id.includes("node_modules")) {
            return "vendors";
          }
        },
        
        // 🛡️ KEAMANAN ASET
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  
  // 🛡️ KEAMANAN SERVER
  server: {
    strictPort: true,
    headers: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "X-XSS-Protection": "1; mode=block",
    }
  }
});