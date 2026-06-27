// app/hooks/useNavbarLogic.ts
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export function useNavbarLogic() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#beranda");

  // Deteksi rute halaman layanan
  const isLayananPage = location.pathname === "/layanan";
  
  // ⚡ SINKRONISASI: Ubah dari "/tentang-kami" menjadi "/tentang" sesuai nama file routing baru Abang
  const isAboutPage = location.pathname === "/tentang" || location.pathname === "/tentang-kami";

  useEffect(() => {
    // Pengaman tambahan agar window hanya dieksekusi saat browser aktif
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const executeNavigationState = (href: string) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (href: string) => {
    executeNavigationState(href);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  // LOGIKA CSS DINAMIS UTAMA
  const headerStyle = isLayananPage || isAboutPage || isScrolled
    ? "border-b border-slate-100 bg-white/80 backdrop-blur-md py-3 shadow-xs text-slate-900"
    : "bg-transparent py-5 text-slate-700";

  const mobileButtonColor = isMobileMenuOpen 
    ? "text-blue-600" 
    : (isLayananPage || isAboutPage || isScrolled ? "text-slate-900" : "text-slate-700");

  return {
    isMobileMenuOpen,
    activeLink,
    isLayananPage,
    isAboutPage, 
    isScrolled,
    headerStyle,
    mobileButtonColor,
    toggleMobileMenu,
    handleNavigation,
  };
}