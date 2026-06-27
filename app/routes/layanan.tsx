import { useMemo, useState, useEffect, useRef, memo } from "react";
import { Calculator, CheckCircle2, HelpCircle } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer";
import { useLayananCalculator } from "../hooks/useLayananCalculator";
import { PRICING_DATA, VALUE_PROPOSITIONS } from "../config/services";
import { WHATSAPP_URL } from "../config/navigation";

// ==========================================
// 1. SUB-KOMPONEN: HERO SECTION (Pure Static - Memoized)
// ==========================================
const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50/50 border-b border-slate-100">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center relative z-20">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
          Layanan Kami
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tight leading-none">
          Perawatan Terbaik <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Untuk Pakaian Anda.</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Pilih dari berbagai opsi layanan fleksibel yang dirancang untuk menjaga higienitas, kelembutan, dan efisiensi waktu harian Anda.
        </p>
      </div>
    </section>
  );
});

// ==========================================
// 2. SUB-KOMPONEN: KALKULATOR KILOAN (CARD)
// ==========================================
interface CalculatorCardProps {
  kiloanServices: typeof PRICING_DATA;
}

function CalculatorCard({ kiloanServices }: CalculatorCardProps) {
  const { weight, totalPrice, handleWeightChange, handleServiceChange } = useLayananCalculator(kiloanServices);

  // Menghindari kalkulasi parsing Regex berulang saat render ulang yang tidak perlu
  const renderedOptions = useMemo(() => {
    return kiloanServices.map((item, index) => {
      const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
      return (
        <option key={index} value={numericPrice}>
          {item.name} ({item.price}/{item.unit})
        </option>
      );
    });
  }, [kiloanServices]);

  return (
    <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-6">
        <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
          <Calculator size={20} />
        </div>
        <div>
          <h3 className="font-black text-lg uppercase tracking-tight">Kalkulator Kiloan</h3>
          <p className="text-xs text-slate-400">Estimasi anggaran biaya cucian Anda.</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Pilih Jenis Layanan Kiloan
          </label>
          <select 
            onChange={handleServiceChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            {renderedOptions}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Perkiraan Berat (KG)
          </label>
          <div className="relative flex items-center">
            <input 
              type="number" 
              min="1" 
              step="0.5"
              value={weight || ""}
              onChange={handleWeightChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Masukkan berat..."
            />
            <span className="absolute right-4 text-xs font-bold text-slate-400 pointer-events-none">KG</span>
          </div>
        </div>
      </div>

      <div className="mt-8 p-5 bg-slate-800/50 border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Total Estimasi</span>
          <span className="text-2xl font-black text-white tracking-tight mt-0.5 block">
            Rp {totalPrice.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] bg-blue-500/10 text-blue-400 font-bold px-2 py-1 rounded-md uppercase tracking-wider">
            {weight} Kg Total
          </span>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 mt-4 leading-normal flex items-start gap-1.5">
        <HelpCircle size={14} className="shrink-0 text-slate-600 mt-0.5" />
        Timbangan resmi akan dihitung di workshop menggunakan timbangan digital akurat saat penjemputan selesai.
      </p>
    </div>
  );
}

// ==========================================
// 3. SUB-KOMPONEN: FAQ (Dideklarasikan di luar agar hemat memori)
// ==========================================
const FAQS_DATA = [
  { q: "Berapa lama durasi pengerjaan laundry?", a: "Untuk paket Reguler membutuhkan waktu 2-3 hari, sedangkan paket Kilat/Ekspres bisa selesai dalam waktu 24 jam saja." },
  { q: "Apakah pakaian saya akan dicampur dengan pelanggan lain?", a: "Sama sekali tidak. Kami menerapkan sistem 1 pelanggan 1 mesin cuci (Isolasi Higienis) demi menjaga kebersihan garmen Anda." },
  { q: "Bagaimana jika ada pakaian yang rusak atau hilang?", a: "Kami memiliki jaminan garansi layanan. Setiap kendala operasional akan diproses sesuai dengan regulasi kompensasi workshop." }
];

const FaqSection = memo(function FaqSection() {
  return (
    <section className="py-24 bg-white relative z-20 border-b border-slate-100">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Sering Ditanyakan</h2>
          <p className="text-sm text-slate-500 mt-2">Segala informasi dasar terkait proses penanganan laundry kami.</p>
        </div>
        <div className="space-y-6">
          {FAQS_DATA.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100/80">
              <h4 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <HelpCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
                {faq.q}
              </h4>
              <p className="mt-2.5 text-sm text-slate-600 pl-6.5 leading-relaxed font-medium">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// ==========================================
// 4. SUB-KOMPONEN: OPTIMIZED CALL TO ACTION (CTA)
// ==========================================
const CtaSection = memo(function CtaSection() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); 
        }
      },
      { rootMargin: "150px" }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-white pt-20 pb-24 z-20 px-6 lg:px-12 overflow-visible">
      <div className="mx-auto max-w-5xl overflow-visible">
        
        <div className="relative overflow-visible rounded-3xl bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-2xl shadow-blue-600/15 py-10 px-8 md:px-16 md:py-12">
          
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative z-10 overflow-visible">
            
            <div className="lg:col-span-4 flex justify-center items-center min-h-40 lg:min-h-50 relative overflow-visible">
              
              <div 
                ref={containerRef}
                className="w-52 h-52 sm:w-60 sm:h-60 lg:w-76 lg:h-76 aspect-square lg:absolute lg:-top-20 lg:left-1/2 lg:-translate-x-1/2 z-35 overflow-visible drop-shadow-[0_25px_30px_rgba(0,0,0,0.4)] transform hover:scale-108 transition-transform duration-500 flex items-center justify-center"
              >
                {isIntersecting ? (
                  <DotLottieReact
                    src="https://lottie.host/4e677c2e-4aeb-4a7b-a1d3-224e285792de/GTUV5CSZRn.lottie"
                    loop
                    autoplay
                    width="100%"
                    height="100%"
                    className="w-full h-full object-contain scale-110 lg:scale-120 overflow-visible"
                  />
                ) : (
                  <div className="w-full h-full aspect-square bg-white/5 animate-pulse rounded-full" />
                )}
              </div>

            </div>

            <div className="lg:col-span-8 text-center lg:text-left space-y-4 lg:pl-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-cyan-100 backdrop-blur-xs">
                Layanan Antar Jemput Gratis
              </span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none">
                Malas Keluar Rumah? <br className="hidden sm:inline" />
                <span className="text-cyan-200">Gunakan Layanan Antar Jemput!</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-blue-50 max-w-xl lg:max-w-2xl font-medium opacity-90 leading-relaxed">
                Kurir kami siap menjemput pakaian kotor Anda langsung di depan pintu rumah dan mengantarkannya kembali dalam kondisi rapi, bersih, dan wangi semerbak.
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-4 bg-slate-950 text-white font-bold text-[11px] uppercase tracking-widest rounded-full shadow-xl hover:bg-slate-900 active:scale-95 hover:scale-[1.03] transition-all duration-300 group cursor-pointer select-none"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-white transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 ease-out shrink-0"
                  >
                    <path d="M12.004 2c-5.51 0-9.99 4.49-9.99 10 0 1.77.47 3.49 1.35 5l-1.36 4.97 5.09-1.33c1.47.8 3.11 1.22 4.79 1.22 5.51 0 10-4.49 10-10s-4.49-10-10-10zm5.85 14.26c-.25.71-1.25 1.31-1.74 1.35-.49.04-.97.22-3.13-.63-2.77-1.09-4.52-3.93-4.66-4.11-.14-.19-1.12-1.49-1.12-2.84 0-1.35.7-2.01.95-2.28.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.4.04.61.54.22.53.76 1.85.82 1.98.07.13.11.29.02.48-.09.18-.18.3-.36.51-.18.2-.38.45-.54.61-.18.19-.38.39-.16.76.22.37.96 1.58 2.06 2.56 1.42 1.27 2.62 1.66 3 1.84.37.19.59.16.81-.08.22-.25.96-1.11 1.21-1.49.25-.38.5-.32.84-.2.33.13 2.13 1 2.5 1.18.37.18.61.27.7.43.09.16.09.93-.16 1.64z" />
                  </svg>
                  <span>Hubungi Kurir Sekarang</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
});

// ==========================================
// 5. SUB-KOMPONEN: VALUE PROPOSITIONS (Memoized)
// ==========================================
const ValuePropsSection = memo(function ValuePropsSection() {
  return (
    <section className="bg-slate-50 border-t border-b border-slate-100 py-20 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Kenapa Memilih Kami?</h2>
          <p className="text-sm text-slate-500 mt-2">Standar perawatan prima untuk ketenangan pikiran Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUE_PROPOSITIONS.map((prop) => {
            const Icon = prop.icon;
            return (
              <div key={prop.id} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-xs flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{prop.title}</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{prop.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

// ==========================================
// 6. SUB-KOMPONEN: PRICING LIST (Dipisah agar tidak re-render saat kalkulator aktif)
// ==========================================
const PricingList = memo(function PricingList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {PRICING_DATA.map((item, index) => (
        <div 
          key={index}
          className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-blue-500/30 hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
            {item.badge && (
              <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                item.badge === "Populer" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
              }`}>
                {item.badge}
              </span>
            )}
          </div>
          <div className="mt-4 flex items-baseline text-slate-900">
            <span className="text-xl font-black tracking-tight">{item.price}</span>
            <span className="text-xs font-semibold text-slate-400 ml-1">/{item.unit}</span>
          </div>
          <ul className="mt-4 space-y-2 border-t border-slate-50 pt-4">
            <li className="text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-500" /> Cuci + Deterjen Premium
            </li>
            <li className="text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-500" /> Setrika Uap Presisi
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
});

// ==========================================
// CORE EXPORT COMPONENT
// ==========================================
export default function LayananPage() {
  const kiloanServices = useMemo(() => {
    return PRICING_DATA.filter((item) => item.unit.toLowerCase().includes("kg"));
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-500 selection:text-white font-sans antialiased overflow-x-hidden relative">
      <Navbar />
      
      <HeroSection />

      {/* PRICING & CALCULATOR WORKSPACE */}
      <section className="py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Kiri: Daftar Paket Layanan (Terproteksi dari re-render kalkulator) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2 mb-8">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Opsi Paket Populer</h2>
                <p className="text-sm text-slate-500">Tarif transparan flat tanpa biaya siluman tambahan.</p>
              </div>

              <PricingList />
            </div>

            {/* Kanan: Komponen Kalkulator (Sticky) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <CalculatorCard kiloanServices={kiloanServices} />
            </div>

          </div>
        </div>
      </section>

      <ValuePropsSection />

      <FaqSection />
      
      <CtaSection />

      <Footer />
    </div>
  );
}