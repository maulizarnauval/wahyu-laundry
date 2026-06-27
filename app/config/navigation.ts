export const PATH_LAYANAN = "/layanan";
export const PATH_TENTANG = "/tentang";
export const PATH_HOME = "/";

export const WHATSAPP_URL = "https://wa.me/6281263190663";

export interface NavLinkItem {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { href: "#beranda", label: "Beranda" },
  { href: PATH_LAYANAN, label: "Layanan" },
  { href: PATH_TENTANG, label: "Tentang Kami" },
];