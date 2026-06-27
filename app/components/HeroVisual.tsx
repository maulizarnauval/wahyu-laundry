export default function HeroVisual() {
  // Badge properti: Dibuat absolute relatif terhadap container utama HeroVisual
  const badgeClasses = "hidden xl:block absolute pointer-events-auto text-[11px] font-bold text-slate-700 border border-slate-200/60 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xs transition-transform duration-300 hover:scale-105 select-none z-20 whitespace-nowrap";

  return (
    // Parent utama diset full width dan full height
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none select-none">
      
      {/* 🚀 GAMBAR KEMEJA UTAMA */}
      <img 
        src="/baju-hero.png" 
        alt="Wahyu Laundry Hero Shirt"
        className="
          pointer-events-auto transition-all duration-500 select-none
          
          /* 📱 Mobile View Layout: Ditambahkan block, mx-auto, dan reset translate agar aman di mobile */
          block mx-auto w-full max-w-[340px] sm:max-w-[400px] translate-x-0 translate-y-0
          
          /* 🖥️ Desktop View Layout: Menggunakan lebar absolut w-[...] agar dipaksa raksasa & megah */
          md:absolute md:left-1/2 md:top-1/2 md:-translate-y-1/2
          
          /* KUNCI GESER KIRI DAN UKURAN JUMBO */
          md:-translate-x-[72%] 
          md:w-[750px] md:max-w-[750px]
          lg:w-[920px] lg:max-w-[920px]
          xl:w-[950px] xl:max-w-[950px]
          
          /* Kedalaman Bayangan Studio Premium */
          drop-shadow-[0_50px_70px_rgba(59,130,246,0.22)]
          z-10
        "
      />

      {/* 🎯 BADGES POSITIONING */}
      {/* Fallback absolute reset untuk non-desktop viewport disamakan (`left-0 top-0 translate-x-0`) agar tidak memicu horizontal overflow */}
      <div className={`${badgeClasses} left-0 top-0 translate-x-0 md:left-1/2 md:top-[28%] md:-translate-x-[200%]`}>
        ✨ Noda Membandel? Hilang Sempurna!
      </div>
      
      <div className={`${badgeClasses} left-0 bottom-0 translate-x-0 md:left-1/2 md:bottom-[22%] md:-translate-x-[120%]`}>
        🌿 Garansi Bersih & Harum
      </div>

      {/* Floating Card Statistik (Kunci aman di sudut kanan bawah) */}
      <div className="absolute bottom-2 right-2 md:bottom-12 md:right-0 lg:right-4 z-30 pointer-events-auto rounded-2xl bg-white/95 p-3 md:p-4 shadow-xl border border-slate-100/80 backdrop-blur-md w-[110px] md:w-[135px] text-center flex flex-col items-center transition-all duration-300 hover:scale-105">
        <img src="/tumpukan-baju.png" alt="Stacked Clothes" className="w-10 md:w-12 h-auto object-contain mb-1.5" />
        <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">2.7K+</div>
        <p className="mt-0.5 text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-tight">
          Pelanggan Puas & Setia
        </p>
      </div>

    </div>
  );
}