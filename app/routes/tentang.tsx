// app/routes/tentang.tsx
import { memo, useState, useEffect } from "react";
import { Sparkles, ShieldCheck, Leaf, Clock, ArrowRight, Shirt, ArrowUpRight } from "lucide-react";

import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer";
import { WHATSAPP_URL } from "../config/navigation";
import {
  ABOUT_HERO_DATA,
  STORY_DATA,
  CORE_VALUES,
  STATS_DATA,
  CTA_DATA,
} from "../config/about";

interface CoreValueItem {
  id: number;
  title: string;
  desc: string;
}

interface StatItem {
  value: string;
  label: string;
  desc?: string;
}

const ValueIcon = ({ id }: { id: number }) => {
  switch (id) {
    case 1:
      return (
        <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500/10 to-cyan-500/10 text-blue-600">
          <ShieldCheck size={26} className="stroke-[1.75]" />
        </div>
      );
    case 2:
      return (
        <div className="p-3 rounded-2xl bg-linear-to-br from-emerald-500/10 to-teal-500/10 text-emerald-600">
          <Leaf size={26} className="stroke-[1.75]" />
        </div>
      );
    case 3:
      return (
        <div className="p-3 rounded-2xl bg-linear-to-br from-amber-500/10 to-orange-500/10 text-amber-600">
          <Clock size={26} className="stroke-[1.75]" />
        </div>
      );
    default:
      return (
        <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500/10 to-cyan-500/10 text-blue-600">
          <ShieldCheck size={26} className="stroke-[1.75]" />
        </div>
      );
  }
};

// ==========================================
// 1. HERO SECTION (MODERN SPLIT DESIGN)
// ==========================================
const AboutHero = memo(() => (
  <section className="relative pt-36 pb-16 overflow-hidden bg-white">
    {/* Ambient Decorative Light */}
    <div className="absolute top-0 right-0 w-125 h-125 bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute top-40 left-10 w-75 h-75 bg-cyan-400/5 rounded-full blur-[80px] pointer-events-none" />

    <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
      <div className="max-w-3xl">
        {/* Modern Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold text-blue-600 tracking-wide mb-6 backdrop-blur-xs">
          <Sparkles size={13} className="animate-pulse" />
          <span>{ABOUT_HERO_DATA?.badge || "Tentang Wahyu Laundry"}</span>
        </div>
        
        {/* Dynamic Typography (Not Boring All-Caps) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
          {ABOUT_HERO_DATA?.titlePart1 || "Menghadirkan standar baru"}{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
            {ABOUT_HERO_DATA?.titlePart2 || "perawatan pakaian modern"}
          </span>
        </h1>
        
        <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed font-normal max-w-2xl">
          {ABOUT_HERO_DATA?.description || "Kami berkomitmen merawat setiap serat benang pakaian Anda dengan teknologi mutakhir dan dedikasi penuh kebersihan."}
        </p>
      </div>
    </div>
  </section>
));

// ==========================================
// 2. STORY SECTION (ASYNCHRONOUS SPLIT LAYOUT)
// ==========================================
const StorySection = memo(() => (
  <section className="py-20 bg-slate-50/50 border-t border-slate-100 relative z-10">
    <div className="mx-auto max-w-7xl px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Side: Big Statement */}
        <div className="lg:col-span-5 sticky top-28">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-3">
            {STORY_DATA?.badge || "Kisah Perjalanan Kami"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {STORY_DATA?.title || "Dedikasi Menjaga Kesegaran Pakaian Sepenuh Hati"}
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full mt-6" />
        </div>

        {/* Right Side: Paragraph Narratives */}
        <div className="lg:col-span-7 space-y-6 text-slate-600 text-base leading-relaxed font-normal">
          {Array.isArray(STORY_DATA?.paragraphs) ? (
            STORY_DATA.paragraphs.map((para: string, idx: number) => (
              <p key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:border-slate-200 transition-colors duration-300">
                {para}
              </p>
            ))
          ) : (
            <p className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
              Mulai dari usaha lokal kecil hingga berkembang menjadi workshop laundry terpercaya dengan standarisasi manajemen mutu yang tinggi untuk kepuasan pelanggan setia kami.
            </p>
          )}
        </div>

      </div>
    </div>
  </section>
));

// ==========================================
// 3. VALUES SECTION (BENTO INTERACTIVE CARDS)
// ==========================================
const ValuesSection = memo(() => (
  <section className="bg-white py-24 relative z-10">
    <div className="mx-auto max-w-7xl px-6 lg:px-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Nilai Utama</span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Pilar Utama Pelayanan Kami
        </h2>
      </div>

      {/* Modern Bento Grid Structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {Array.isArray(CORE_VALUES) &&
          CORE_VALUES.map((value: CoreValueItem) => (
            <div 
              key={value?.id || Math.random()} 
              className="group relative p-8 bg-slate-50/50 border border-slate-100 rounded-3xl transition-all duration-300 hover:bg-white hover:border-white hover:shadow-xl hover:shadow-slate-100/80 hover:-translate-y-1"
            >
              <div className="mb-6 block w-fit transform group-hover:scale-110 transition-transform duration-300">
                <ValueIcon id={value.id} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                {value?.title || ""}
              </h4>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                {value?.desc || ""}
              </p>
              
              {/* Subtle top corner indicator */}
              <ArrowUpRight size={16} className="absolute top-6 right-6 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all duration-300" />
            </div>
          ))}
      </div>
    </div>
  </section>
));

// ==========================================
// 4. STATS SECTION (FLOATING MODERN METRICS)
// ==========================================
const StatsSection = memo(() => (
  <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
    {/* Grid Background Pattern Overlay */}
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />
    
    <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center divide-x-0 md:divide-x divide-slate-800">
        {Array.isArray(STATS_DATA) &&
          STATS_DATA.map((stat: StatItem, idx: number) => (
            <div key={idx} className="space-y-1.5 px-2">
              <span className="block text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300 tracking-tight">
                {stat?.value || "0"}
              </span>
              <span className="block text-xs font-bold text-slate-100 tracking-wider uppercase">
                {stat?.label || ""}
              </span>
              {stat?.desc && (
                <span className="block text-[11px] text-slate-400 font-medium">
                  {stat.desc}
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  </section>
));

// ==========================================
// 5. CTA SECTION (PREMIUM FLUID GLASS LAYOUT)
// ==========================================
const AboutCta = memo(() => (
  <section className="relative w-full py-24 px-6 overflow-hidden bg-slate-50/60">
    {/* Dynamic Background Blurs */}
    <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

    <div className="mx-auto max-w-5xl relative z-10">
      {/* Floating Modern Container */}
      <div className="relative overflow-hidden rounded-3xl border border-white bg-white p-8 md:p-16 shadow-xl shadow-slate-200/40 text-center">
        
        {/* Micro Interaction Badge */}
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600">
          <Shirt size={13} className="animate-bounce" />
          <span>Layanan Premium Antar-Jemput</span>
        </div>

        {/* Elegant Headline Separation */}
        <h2 className="mx-auto max-w-3xl text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          {CTA_DATA?.title ? (
            <>
              {CTA_DATA.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {CTA_DATA.title.split(" ").pop()}
              </span>
            </>
          ) : (
            <>
              Rasakan Kemudahan Perawatan{" "}
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Premium Kami
              </span>
            </>
          )}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-slate-500">
          {CTA_DATA?.desc || "Biarkan tim kurir dan spesialis workshop kami yang bekerja keras mengembalikan kesegaran pakaian Anda sementara Anda fokus pada hal penting lainnya."}
        </p>

        {/* Shimmer Button Micro-interaction */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP_URL || "#"}
            target="_blank"
            rel="noreferrer"
            className="group relative flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-2xl bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
          >
            <span>{CTA_DATA?.buttonText || "Mulai Kirim Pakaian Sekarang"}</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
            
            {/* Ambient Shimmer Flare */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-in-out" />
          </a>
        </div>

      </div>
    </div>
  </section>
));

// ==========================================
// MAIN EXPORT (REACT ROUTER v8 COMPLIANT)
// ==========================================
export default function AboutPage() {
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div className="min-h-screen bg-white text-slate-900 font-sans antialiased" />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <AboutHero />
        <StorySection />
        <ValuesSection />
        <StatsSection />
        <AboutCta />
      </main>
      <Footer />
    </div>
  );
}