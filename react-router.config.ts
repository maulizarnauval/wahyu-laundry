// react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  // Tetap aktifkan SSR karena React Router memerlukan proses kompilasi server-side
  // pada saat mendesain dan membangun (fase build) file HTML statis Anda.
  ssr: true,

  // ⚡ OPTIMASI STRUKTUR 3 HALAMAN UTAMA (SSG PRE-RENDERING)
  // Mendaftarkan seluruh rute berdasarkan file yang ada di app/routes/
  async prerender() {
    return [
      "/",         
      "/layanan",  
      "/tentang",  
    ];
  },
} satisfies Config;