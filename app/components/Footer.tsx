export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800 relative z-40">
      {/* Dekorasi Grid Pattern Mini sebagai pemanis background agar tidak flat */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15 pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full px-6 lg:px-12 relative z-20">
        
        {/* Top Footer: Split Row Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/60 items-start">
          
          {/* Kiri: Brand & Status Badge (4 Kolom) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-white tracking-tight uppercase">
                Wahyu<span className="text-blue-400">Laundry.</span>
              </span>
              {/* Elemen Pemanis: Status Toko Aktif */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Menerima Pesanan
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
              Solusi pencucian premium andalan keluarga. Menjaga pakaian Anda tetap bersih higienis, rapi presisi, dan wangi tahan lama tanpa ribet.
            </p>
          </div>

          {/* Kanan: Alamat Fisik Detail & Navigasi Kurir (7 Kolom) */}
          <div className="md:col-span-7 md:col-start-6 space-y-3">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
              {/* Pemanis: Mini Map Marker Icon */}
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Workshop Utama & Titik Penjemputan
            </p>
            
            {/* Card Komponen Alamat Kreatif */}
            <div className="p-5 rounded-2xl bg-slate-800/30 border border-slate-800/80 backdrop-blur-xs relative group hover:border-slate-700/80 transition-colors duration-300">
              <p className="text-sm text-white font-semibold leading-relaxed tracking-wide">
                Simpang Surabaya, Lorong Geulatik
              </p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Di belakang Bandrek Pak Sen, Nomor 2 B
              </p>
              <div className="text-[10px] text-blue-400/80 font-medium mt-3 flex items-center gap-1 uppercase tracking-wider">
                <span>Kec. Lueng Bata, Kota Banda Aceh</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Footer: Copyright & Credits Layer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 font-medium tracking-wide text-center sm:text-left">
            © {new Date().getFullYear()} Wahyu Laundry. Hak Cipta Dilindungi Undang-Undang.
          </p>
          
          {/* Designer Attribution Signature */}
          <div className="text-center sm:text-right group">
            <p className="text-xs font-medium tracking-wide text-slate-500">
              Designed by <span className="font-bold text-slate-300 group-hover:text-blue-400 transition-colors duration-300 cursor-default">Maulizar Nauval</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}