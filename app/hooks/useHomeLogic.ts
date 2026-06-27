import { useState } from "react";

export function useHomeLogic() {
  // Mengontrol modal order
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  // 🚀 PASTIKAN STATE INI ADA: Mengontrol ID FAQ yang sedang terbuka
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  const openOrderModal = () => setIsOrderModalOpen(true);
  const closeOrderModal = () => setIsOrderModalOpen(false);

  // 🚀 PASTIKAN FUNGSI INI ADA: Logika buka-tutup accordion FAQ
  const toggleFaq = (id: string) => {
    setActiveFaqId((prevId) => (prevId === id ? null : id));
  };

  // 🚀 DISINI KUNCI MASALAHNYA: Kembalikan semuanya agar bisa dibaca oleh home.tsx
  return {
    isOrderModalOpen,
    openOrderModal,
    closeOrderModal,
    activeFaqId, // ◄ Jangan sampai ketinggalan
    toggleFaq,   // ◄ Jangan sampai ketinggalan
  };
}