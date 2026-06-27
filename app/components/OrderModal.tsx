// app/components/OrderModal.tsx
import { useState } from "react";
import { X, ArrowRight, Waves, Shirt, Scissors, Layers, Cpu, MapPin, CheckCircle, Loader2 } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ORDER_OPTIONS = [
  { id: "cuci_manual", label: "Cuci Manual", icon: Waves },
  { id: "cuci_mesin", label: "Cuci Mesin", icon: Cpu },
  { id: "cuci_saja", label: "Cuci Saja", icon: Shirt },
  { id: "setrika_saja", label: "Setrika Saja", icon: Scissors },
  { id: "seprai", label: "Seprai", icon: Layers },
  { id: "selimut", label: "Selimut", icon: Layers },
  { id: "bed_cover", label: "Bed Cover", icon: Layers },
];

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  // 🚀 STATE INTEGRASI MAPS
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [mapStatus, setMapStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!isOpen) return null;

  // 🚀 FUNGSI MENANGKAP KOORDINAT GPS HP/BROWSER USER
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung deteksi lokasi GPS.");
      return;
    }

    setMapStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeoCoords({ lat: latitude, lng: longitude });
        setMapStatus("success");
      },
      (error) => {
        console.error("Error fetching GPS Coords:", error);
        setMapStatus("error");
        alert("Gagal mendeteksi lokasi otomatis. Mohon isi alamat manual dengan detail patokan.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleToggleService = (serviceLabel: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceLabel)
        ? prev.filter(item => item !== serviceLabel)
        : [...prev, serviceLabel]
    );
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerAddress || selectedServices.length === 0) {
      alert("Mohon lengkapi nama, alamat, dan pilih minimal satu layanan.");
      return;
    }

    const phoneNumber = "6281263190663";
    
    // 🚀 SINKRONISASI TAUTAN MAPS RESMI (Bebas dari typo typo club)
    let mapsLinkMessage = "Pelanggan tidak menyertakan koordinat GPS.";
    if (geoCoords) {
      mapsLinkMessage = `https://www.google.com/maps?q=${geoCoords.lat},${geoCoords.lng}`;
    }

    const message = `Halo Wahyu Laundry, saya ingin memesan layanan laundry:%0A%0A` +
                    `*Nama Pelanggan:* ${customerName}%0A` +
                    `*Alamat Penjemputan:* ${customerAddress}%0A%0A` +
                    `*Pin Point Lokasi (GPS):* ${mapsLinkMessage}%0A%0A` +
                    `*Layanan yang Dipilih:*%0A` + 
                    selectedServices.map(service => `• ${service}`).join("%0A") + `%0A%0A` +
                    `Mohon konfirmasi jadwal penjemputan ke alamat saya di atas. Terima kasih!`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    
    // Reset & Close
    setCustomerName("");
    setCustomerAddress("");
    setSelectedServices([]);
    setGeoCoords(null);
    setMapStatus("idle");
    onClose();
  };

  return (
    // ⚡ PERBAIKAN UTAMA: Mengubah z-50 menjadi z-[120] agar modal berada di atas Navbar (z-[100])
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Formulir Pemesanan</h3>
            <p className="text-xs text-slate-500 mt-0.5">Pilih layanan dan isi data penjemputan Anda.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-900">
          
          {/* Nama Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nama Lengkap</label>
            <input 
              type="text"
              required
              placeholder="Masukkan nama Anda..."
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Alamat Input & Integrasi Tombol GPS */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Alamat Penjemputan</label>
              
              {/* TOMBOL MIKRO INTERAKSI MAPS GPS */}
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={mapStatus === "loading"}
                className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  mapStatus === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : mapStatus === "loading"
                    ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                    : "border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-50"
                }`}
              >
                {mapStatus === "loading" && <Loader2 size={12} className="animate-spin" />}
                {mapStatus === "success" && <CheckCircle size={12} />}
                {mapStatus === "idle" || mapStatus === "error" ? <MapPin size={12} /> : null}
                <span>
                  {mapStatus === "loading" ? "Mendeteksi..." : mapStatus === "success" ? "Lokasi Terkunci" : "Kunci Koordinat GPS"}
                </span>
              </button>
            </div>
            
            <textarea 
              required
              rows={2}
              placeholder="Nama jalan, nomor rumah, detail patokan..."
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>

          {/* Jenis Layanan Options */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Pilih Jenis Layanan</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ORDER_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedServices.includes(option.label);
                return (
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => handleToggleService(option.label)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                      isSelected 
                        ? "border-blue-600 bg-blue-50/70 text-blue-700 ring-2 ring-blue-500/10 font-bold" 
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50/80"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                      <Icon size={14} />
                    </div>
                    <span className="text-xs tracking-tight">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="submit"
              className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>Kirim Pesanan via WhatsApp</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}