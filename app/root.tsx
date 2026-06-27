// app/root.tsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import "./app.css";

// 1. Meta Tags Optimal untuk SEO, Sosmed, & KEAMANAN KETAT PRODUKSI
export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    { title: "Wahyu Laundry | Laundry Bersih, Hidup Lebih Praktis" },
    { 
      name: "description", 
      content: "Wahyu Laundry melayani cucian Anda dengan pelayanan terbaik, cepat, bersih, dan higienis. Tersedia layanan antar-jemput wilayah sekitar." 
    },
    { name: "keywords", content: "wahyu laundry, laundry terdekat, jasa laundry, laundry antar jemput, cuci baju bersih" },
    
    // ⚡ BENTENG KEAMANAN UTAMA (CSP): Menggunakan httpEquiv (React Valid) tanpa 'unsafe-eval'
    {
      httpEquiv: "Content-Security-Policy",
      content: 
        "default-src 'self'; " +
        // Membatasi eksekusi skrip hanya dari internal dan CDN Leaflet resmi yang valid
        "script-src 'self' 'unsafe-inline' https://unpkg.com; " +
        // Mengamankan style styling agar tidak disisipi CSS berbahaya
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; " +
        // Memastikan tile map OpenStreetMap dan logo ter-render dengan aman
        "img-src 'self' data: blob: https://unpkg.com https://*.tile.openstreetmap.org /logo.png; " +
        // Mengamankan jalur koneksi data/WebSocket server lokal maupun endpoint produksi
        "connect-src 'self' ws://localhost:* http://localhost:*; " +
        "font-src 'self' https://fonts.gstatic.com;"
    },
    
    // Open Graph / Facebook / WhatsApp Meta Tags
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Wahyu Laundry | Laundry Bersih, Hidup Lebih Praktis" },
    { property: "og:description", content: "Cucian bersih, rapi, dan higienis dengan layanan antar-jemput instan." },
    { property: "og:image", content: "/logo.png" },
    
    // Twitter Meta Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Wahyu Laundry" },
    { name: "twitter:description", content: "Jasa laundry premium dengan layanan antar-jemput." },
    { name: "twitter:image", content: "/logo.png" },
  ];
};

// 2. ⚡ OPTIMASI PERFORMA LINKS (Pemberantas LCP Delay & Font Blocking)
export const links: LinksFunction = () => [
  // Native Favicon (Aman dan kencang tanpa request HTTP tambahan)
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👕</text></svg>",
  },
  
  // Perbaikan LCP & Performa Loading Asset Eksternal
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  
  // Menggunakan display=swap agar teks langsung muncul demi kestabilan layout
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  },
  
  // CSS Leaflet Map resmi dengan validasi integritas kode (SHA)
  {
    rel: "stylesheet",
    href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
    integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
    crossOrigin: "anonymous",
  },
];

// 3. Root Layout Component (Production Ready & Stabil)
export default function App() {
  return (
    <html lang="id" className="scroll-smooth antialiased">
      <head>
        <Meta />
        <Links />
      </head>
      {/* Kestabilan penuh pada body utama untuk mencegah pergeseran layout (CLS) */}
      <body className="bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white min-h-screen text-base">
        <Outlet />
        <ScrollRestoration />
        {/* Scripts dimuat optimal agar interaksi ketukan tombol (INP) berjalan instan */}
        <Scripts />
      </body>
    </html>
  );
}

// 4. Error Boundary Komplet dengan Favicon dan CSP Tetap Aktif Saat Crash
export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Terjadi kesalahan internal pada sistem.";
  let details = "Silakan coba muat ulang halaman.";

  if (error instanceof Error) {
    message = error.message;
    details = error.stack || details;
  }

  return (
    <html lang="id">
      <head>
        <title>Sistem Error | Wahyu Laundry</title>
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center font-sans selection:bg-red-500 selection:text-white">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Oops! Terjadi Gangguan</h1>
          <p className="mt-2 text-sm text-slate-600 font-medium">{message}</p>
          <div className="mt-4 text-[11px] font-mono text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto text-left whitespace-pre-wrap max-h-40">
            {details}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/10 hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer"
          >
            Muat Ulang Halaman
          </button>
        </div>
        <Scripts />
      </body>
    </html>
  );
}