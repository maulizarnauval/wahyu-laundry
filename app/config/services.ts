import { CheckCircle, Clock, Sparkles, Hand, Cpu, Trash2, Scissors, Layers, Bookmark, Truck } from "lucide-react";

// 🌟 VALUE_PROPOSITIONS: Tiga pilar utama di bagian atas layanan
export const VALUE_PROPOSITIONS = [
  { id: "aman", title: "Aman", desc: "Cucian dirawat", icon: CheckCircle },
  { id: "cepat", title: "Cepat", desc: "Tepat waktu", icon: Clock },
  { id: "bersih", title: "Bersih", desc: "Wangi segar", icon: Sparkles },
];

// 📦 SERVICES_DATA: Data Layanan Utama (Dipakai untuk mapping grid/list layanan)
export const SERVICES_DATA = [
  { id: "cuci-manual", name: "Cuci Manual", icon: Hand },
  { id: "cuci-mesin", name: "Cuci Mesin", icon: Cpu },
  { id: "cuci-saja", name: "Cuci Saja", icon: Trash2 },
  { id: "gosok-saja", name: "Gosok Saja", icon: Scissors },
  { id: "seprai", name: "Seprai / Sprei", icon: Layers },
  { id: "bed-cover", name: "Bed Cover & Selimut", icon: Bookmark },
];

// 🏷️ PRICING_DATA: Data Tabel Harga Detail
export const PRICING_DATA = [
  { name: "Cuci Manual", price: "Rp 10.000", unit: "Kg", badge: "Extra Care" },
  { name: "Cuci Mesin", price: "Rp 8.000", unit: "Kg", badge: "Populer" },
  { name: "Cuci Saja", price: "Rp 5.000", unit: "Kg", badge: "" },
  { name: "Gosok Saja", price: "Rp 5.000", unit: "Kg", badge: "" },
  { name: "Seprai", price: "Rp 12.000", unit: "Kg", badge: "" },
  { name: "Selimut", price: "Variatif", unit: "Ukuran", badge: "Cek Ukuran" },
  { name: "Bed Cover", price: "Variatif", unit: "Ukuran", badge: "Cek Ukuran" },
];

// 🚀 WHAT_WE_DO: Data Konten Seksi "Apa Yang Kami Kerjakan" di Beranda
export const WHAT_WE_DO = [
  {
    id: "premium_wash",
    title: "Pencucian Premium",
    desc: "Menggunakan detergen ramah serat kain dan air bersih terfilter untuk menjaga keaslian warna pakaian Anda.",
    icon: Sparkles,
  },
  {
    id: "ironing",
    title: "Setrika Uap Presisi",
    desc: "Pakaian disetrika rapi menggunakan uap panas tinggi, meminimalisir risiko noda gosong atau kain mengkilap.",
    icon: Scissors,
  },
  {
    id: "delivery",
    title: "Antar Jemput GPS",
    desc: "Khusus area Lueng Bata dan sekitarnya (Simpang Surabaya, Lorong Geulatik), kurir siap bergerak sesuai kunci koordinat GPS Anda.",
    icon: Truck,
  },
  {
    id: "express_service",
    title: "Layanan Kilat",
    desc: "Cucian menumpuk tapi buru-buru mau dipakai? Tersedia opsi pengerjaan kilat selesai dalam hitungan jam.",
    icon: Clock,
  },
];

// ❓ FAQ_DATA: Pertanyaan yang sering diajukan pelanggan
export const FAQ_DATA = [
  {
    id: "faq_1",
    question: "Berapa lama durasi pengerjaan laundry?",
    answer: "Layanan reguler memakan waktu 1-2 hari kerja. Tersedia juga opsi layanan ekspres yang bisa selesai dalam waktu 3 hingga 6 jam.",
  },
  {
    id: "faq_2",
    question: "Bagaimana cara kerja fitur Antar-Jemput GPS?",
    answer: "Saat menekan tombol 'Pesan Sekarang', Anda bisa mengklik 'Kunci Koordinat GPS'. Titik koordinat lokasi Anda akan otomatis terlampir ke WhatsApp kurir kami untuk akurasi penjemputan.",
  },
  {
    id: "faq_3",
    question: "Apakah ada minimal berat untuk pencucian kiloan?",
    answer: "Minimal pencucian untuk layanan kiloan adalah 3 Kg per transaksi. Di bawah 3 Kg akan tetap dihitung sebagai tarif minimum 3 Kg.",
  },
  {
    id: "faq_4",
    question: "Bagaimana jika pakaian saya tertukar atau rusak?",
    answer: "Wahyu Laundry menerapkan sistem 'Satu Nota Satu Mesin' (tidak dicampur dengan orang lain). Jika terjadi kerusakan akibat kelalaian kami, tersedia garansi ganti rugi sesuai syarat ketentuan.",
  },
];