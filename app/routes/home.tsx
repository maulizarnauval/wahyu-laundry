import { ArrowRight } from "lucide-react";

import Navbar from "../components/Navbar/index";
import HeroVisual from "../components/HeroVisual";
import OrderModal from "../components/OrderModal";
import FAQSection from "../components/FAQSection"; 
import Footer from "../components/Footer"; // 👈 Impor komponen Footer global baru

// 📦 Impor seluruh data terpusat dari config services
import { VALUE_PROPOSITIONS, PRICING_DATA, WHAT_WE_DO } from "../config/services";
import { useHomeLogic } from "../hooks/useHomeLogic"; 

export default function Home() {
  // Menerima state dan fungsi handler langsung dari hook eksternal
  const { 
    isOrderModalOpen, 
    openOrderModal, 
    closeOrderModal, 
    activeFaqId, 
    toggleFaq 
  } = useHomeLogic();

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-500 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* GLOBAL NAVIGATION LAYER */}
      <Navbar />

      {/* HERO SECTION */}
      <section id="beranda" className="relative min-h-screen md:h-screen flex flex-col items-center justify-center pt-24 md:pt-0 overflow-hidden bg-ambient-wahyu">
        
        {/* Grid Container */}
        <div className="mx-auto max-w-7xl w-full px-6 lg:px-12 flex flex-col md:grid md:grid-cols-12 items-center relative h-full min-h-screen md:min-h-auto pb-12 md:pb-0 z-20">
          
          {/* CONTENT COLUMN (md:col-span-5) */}
          <div className="space-y-5 md:col-span-5 z-30 flex flex-col justify-center relative mt-8 md:mt-0 w-full pointer-events-none">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] uppercase select-none">
              Laundry<br />Bersih,<br />Hidup Lebih<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Praktis.</span>
            </h1>
            
            <p className="text-xs md:text-sm text-slate-500 max-w-xs md:max-w-sm font-medium leading-relaxed bg-white/40 md:bg-transparent p-2 md:p-0 rounded-xl backdrop-blur-xs md:backdrop-blur-none pointer-events-auto">
              Wahyu Laundry siap melayani cucian Anda dengan perawatan terbaik, hasil maksimal, and wangi tahan lama.
            </p>

            {/* CONTAINER CTA BUTTON WITH MICRO-INTERACTION */}
            <div className="pt-2 pointer-events-auto">
              <button 
                onClick={openOrderModal}
                className="
                  flex items-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-xs md:text-sm font-bold text-white cursor-pointer w-fit
                  shadow-md shadow-slate-900/10
                  transition-all duration-300 ease-out
                  hover:bg-blue-600 
                  hover:scale-[1.03] 
                  hover:shadow-xl hover:shadow-blue-600/20
                  active:scale-[0.98]
                  group
                "
              >
                <span>Pesan Sekarang</span>
                <div className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                  <ArrowRight size={14} />
                </div>
              </button>
            </div>
          </div>

          {/* GRAPHIC VISUAL LAYER (md:col-span-7) */}
          <div className="w-full md:col-span-7 h-full flex items-center justify-center relative min-h-[350px] md:min-h-auto mt-8 md:mt-0 z-10">
            <HeroVisual />
          </div>

        </div>
      </section>

      {/* OVERLAY MODAL LAYER */}
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={closeOrderModal} 
      />

      {/* SECTION: LAYANAN KAMI */}
      <section id="layanan" className="bg-white border-t border-slate-100 py-20 relative z-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          
          {/* VALUE PROPOSITIONS SUB-GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-b border-slate-100 pb-12">
            {VALUE_PROPOSITIONS.map((prop) => {
              const Icon = prop.icon;
              return (
                <div key={prop.id} className="flex items-start gap-4 group">
                  <div className="p-3 bg-slate-50 group-hover:bg-blue-50 rounded-xl text-blue-600 shrink-0 transition-colors duration-200">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {prop.title}
                    </h4>
                    <p className="text-sm text-slate-500 mt-0.5">{prop.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MAIN SERVICES & PRICING SPLIT CONTAINER */}
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
            
            {/* LEFT HEADER AREA */}
            <div className="space-y-2 lg:sticky lg:top-28 shrink-0">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase leading-none">
                Daftar Harga<br />& Layanan
              </h2>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Tarif Transparan</p>
            </div>
            
            {/* RIGHT PRICING LIST TABLE */}
            <div className="w-full max-w-3xl border border-slate-100 rounded-3xl overflow-hidden bg-slate-50/20 shadow-xs">
              {PRICING_DATA.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-5 md:p-6 bg-white border-b border-slate-100 last:border-none hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-slate-900">
                    <span className="text-sm font-bold">{item.name}</span>
                    {item.badge && (
                      <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.badge === "Populer" 
                          ? "bg-blue-50 text-blue-600" 
                          : item.badge === "Extra Care" 
                          ? "bg-purple-50 text-purple-600"
                          : "bg-amber-50 text-amber-600"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-right shrink-0 text-slate-900">
                    <span className="text-sm md:text-base font-black">{item.price}</span>
                    <span className="text-xs font-semibold text-slate-400 ml-0.5">/{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: APA YANG KAMI KERJAKAN (EXPLORATIVE) */}
      {/* ========================================== */}
      <section id="alur-kerja" className="bg-slate-900 py-28 relative overflow-hidden z-40">
        {/* Ambient Neon Radial Ornaments */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl w-full px-6 lg:px-12 relative z-20">
          
          {/* Header Layout Grid Split */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Alur Kerja Profesional
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none">
                Apa Yang Kami <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Kerjakan.</span>
              </h2>
            </div>
            <div className="max-w-xs md:text-right">
              <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                Setiap helai pakaian melewati standardisasi proses ketat demi hasil higienis optimal.
              </p>
            </div>
          </div>

          {/* Asymmetric Structural Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {WHAT_WE_DO && WHAT_WE_DO.map((item, index) => {
              const Icon = item.icon;
              const displayIndex = String(index + 1).padStart(2, '0');
              
              return (
                <div 
                  key={item.id} 
                  className={`
                    group relative p-8 rounded-3xl bg-slate-800/40 border border-slate-800 backdrop-blur-md
                    transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    hover:bg-blue-600 hover:border-blue-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-600/30
                    ${index % 2 === 1 ? 'lg:translate-y-8' : ''}
                  `}
                >
                  {/* Floating Giant Mono Index */}
                  <div className="absolute top-4 right-6 text-5xl font-mono font-black text-slate-700/20 select-none tracking-tighter group-hover:text-white/10 transition-colors duration-500">
                    {displayIndex}
                  </div>

                  {/* Micro-interactive Morphing Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-blue-600 group-hover:rotate-6 group-hover:scale-110">
                    <Icon size={22} />
                  </div>

                  {/* Text Description Block */}
                  <div className="mt-8 relative z-10">
                    <h3 className="text-lg font-black text-white tracking-tight transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-400 mt-2 leading-relaxed transition-colors duration-500 group-hover:text-blue-50">
                      {item.desc}
                    </p>
                  </div>

                  {/* Linear Glow Underlay Accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Spacer Grid Compensation Layer */}
      <div className="h-0 lg:h-8 bg-slate-900" />

      {/* ========================================== */}
      {/* SECTION: FAQ ACCORDION                     */}
      {/* ========================================== */}
      <FAQSection activeFaqId={activeFaqId} onToggleFaq={toggleFaq} />

      {/* ========================================== */}
      {/* GLOBAL FOOTER COMPONENT LAYER              */}
      {/* ========================================== */}
      <Footer />

    </div>
  );
}