// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // 1. Jalur Utama (Beranda)
  index("routes/home.tsx"), 

  // 2. Jalur Halaman Layanan Terpisah
  route("layanan", "routes/layanan.tsx"),

  // ⚡ PERBAIKAN: Daftarkan jalur halaman tentang secara resmi ke sistem React Router v8
  route("tentang", "routes/tentang.tsx"),

] satisfies RouteConfig;