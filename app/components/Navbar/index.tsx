// app/components/Navbar/index.tsx
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { Link } from "react-router"; 
import { WHATSAPP_URL } from "../../config/navigation";
import { useNavbarLogic } from "../../hooks/useNavbarLogic";
import MobileMenu from "./MobileMenu";
import DesktopNav from "./DesktopNav";

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 1. JIKA DI SERVER: Render Fallback Navigasi Statis Aman
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-white border-b border-slate-100 py-4 shadow-xs">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Wahyu Laundry Logo" width={160} height={44} className="h-10 md:h-11 w-auto object-contain rounded-lg" />
          </Link>
          <div className="hidden md:flex items-center min-w-[145px] justify-end">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="rounded-full bg-slate-950 px-5 py-2.5 text-[11px] font-bold uppercase text-white">
              Pesan Sekarang
            </a>
          </div>
        </div>
      </header>
    );
  }

  // 2. JIKA DI BROWSER: Panggil Komponen yang Berisi Hook Browser
  return <ClientNavbarComponent />;
}

function ClientNavbarComponent() {
  // Hook dipanggil di sini (Aman 100% karena fungsi ini hanya dieksekusi di sisi client browser)
  const { 
    isMobileMenuOpen, 
    activeLink, 
    isLayananPage,
    isAboutPage, 
    headerStyle, 
    mobileButtonColor,
    toggleMobileMenu, 
    handleNavigation 
  } = useNavbarLogic();

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ease-in-out will-change-transform ${headerStyle}`}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-12">
          
          <Link 
            to="/" 
            onClick={() => handleNavigation("#beranda")} 
            className="flex items-center gap-2 group active:scale-95 transition-transform duration-150 select-none cursor-pointer"
          >
            <img 
              src="/logo.png" 
              alt="Wahyu Laundry Logo" 
              width={160}
              height={44}
              fetchPriority="high"
              decoding="async"
              className="h-10 md:h-11 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          <DesktopNav 
            activeLink={activeLink} 
            isLayananPage={isLayananPage} 
            isAboutPage={isAboutPage} 
            onNavigate={handleNavigation} 
          />

          <div className="hidden md:flex items-center min-w-[145px] justify-end">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="relative overflow-hidden rounded-full bg-slate-950 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-slate-950/10 active:scale-95 hover:scale-[1.02] hover:bg-blue-600 transition-all duration-300 cursor-pointer group flex items-center gap-2"
            >
              <Phone size={12} className="transform group-hover:rotate-12 transition-transform" />
              <span className="relative z-10">Pesan Sekarang</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out" />
            </a>
          </div>

          <button 
            className={`p-2 md:hidden cursor-pointer transition-all duration-200 active:scale-90 min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 z-50 transition-colors ${mobileButtonColor}`} 
            onClick={toggleMobileMenu} 
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 animate-in fade-in zoom-in-75 duration-150">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        activeLink={activeLink} 
        isLayananPage={isLayananPage}
        isAboutPage={isAboutPage} 
        onLinkClick={handleNavigation} 
      />
    </>
  );
}