import { Link } from "react-router";
import { Phone } from "lucide-react";
import { NAV_LINKS, WHATSAPP_URL } from "../../config/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  activeLink: string;
  isLayananPage: boolean; // ⚡ Tambahkan properti hasil sinkronisasi hook
  isAboutPage: boolean;   // ⚡ Tambahkan properti hasil sinkronisasi hook
  onLinkClick: (href: string) => void;
}

// Helper pemformatan link jangkar secara dinamis (Anchor link formatting helper)
const getNavHref = (href: string, isLayananPage: boolean, isAboutPage: boolean) => {
  const isStaticPage = isLayananPage || isAboutPage;

  if (isStaticPage && href.startsWith("#")) {
    return href === "#beranda" ? "/" : `/${href}`;
  }
  return href;
};

export default function MobileMenu({ 
  isOpen, 
  activeLink, 
  isLayananPage, 
  isAboutPage, 
  onLinkClick 
}: MobileMenuProps) {
  return (
    <>
      {/* ⚡ 1. MIKRO INTERAKSI BACKDROP: Memudar halus menggunakan opacity dinamis */}
      <div 
        className={`fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-xs md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => onLinkClick(activeLink)}
      />

      {/* ⚡ 2. MIKRO INTERAKSI PANEL MENU: Meluncur (slide) dan memudar (fade) secara bersamaan */}
      <div 
        className={`fixed inset-x-0 top-[64px] md:top-[72px] z-40 w-full bg-white border-b border-slate-100 shadow-2xl md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 pt-4 pb-7 bg-white">
          
          {/* DAFTAR LINK NAVIGASI */}
          {NAV_LINKS.map((link) => {
            // ⚡ Logika penentu status aktif yang presisi untuk navigasi mobile
            const isTargetAbout = link.href === "/tentang-kami" || link.href === "#tentang-kami";
            const isActive = isTargetAbout && isAboutPage 
              ? true 
              : !isAboutPage && activeLink === link.href;

            return (
              <Link
                key={link.href}
                to={getNavHref(link.href, isLayananPage, isAboutPage)}
                onClick={() => onLinkClick(link.href)}
                className={`block w-full py-3.5 px-4 text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-98 ${
                  isActive 
                    ? "bg-blue-50 text-blue-600 scale-[1.01]" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* TOMBOL AKSI UTAMA WA */}
          <div className="mt-4 pt-4 border-t border-slate-100 px-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-slate-950 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-[0.97] hover:scale-[1.01] hover:bg-blue-600 transition-all duration-200"
            >
              <Phone size={14} className="animate-pulse" />
              <span>Pesan Sekarang</span>
            </a>
          </div>

        </div>
      </div>
    </>
  );
}