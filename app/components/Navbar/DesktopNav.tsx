import { Link } from "react-router";
import { NAV_LINKS } from "../../config/navigation";

interface DesktopNavProps {
  activeLink: string;
  isLayananPage: boolean;
  isAboutPage: boolean; // ⚡ Tambahkan properti baru hasil sinkronisasi
  onNavigate: (href: string) => void;
}

// Helper pemformatan link jangkar secara dinamis (Anchor link formatting helper)
const getNavHref = (href: string, isLayananPage: boolean, isAboutPage: boolean) => {
  const isStaticPage = isLayananPage || isAboutPage;
  
  if (isStaticPage && href.startsWith("#")) {
    return href === "#beranda" ? "/" : `/${href}`;
  }
  return href;
};

export default function DesktopNav({ 
  activeLink, 
  isLayananPage, 
  isAboutPage, // ⚡ Destructure di sini
  onNavigate 
}: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {NAV_LINKS.map((link) => {
        // ⚡ Logika penentu status aktif yang presisi untuk rute multi-page & single-page
        const isTargetAbout = link.href === "/tentang-kami" || link.href === "#tentang-kami";
        const isActive = isTargetAbout && isAboutPage 
          ? true 
          : !isAboutPage && activeLink === link.href;

        return (
          <Link 
            key={link.href} 
            to={getNavHref(link.href, isLayananPage, isAboutPage)} 
            onClick={() => onNavigate(link.href)} 
            className={`relative py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
              isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
            } group`}
          >
            <span>{link.label}</span>
            <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ease-out ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>
        );
      })}
    </nav>
  );
}