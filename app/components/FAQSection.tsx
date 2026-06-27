import { ChevronDown } from "lucide-react";
import { FAQ_DATA } from "../config/services"; // ──► Diubah ke file services

interface FAQSectionProps {
  activeFaqId: string | null;
  onToggleFaq: (id: string) => void;
}

export default function FAQSection({ activeFaqId, onToggleFaq }: FAQSectionProps) {
  return (
    <section id="faq" className="bg-slate-50 py-20 border-t border-slate-100">
      <div className="mx-auto max-w-4xl px-6">
        
        {/* Header FAQ */}
        <div className="text-center max-w-md mx-auto mb-12">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Pertanyaan Populer</h2>
          <p className="text-sm text-slate-500 mt-2">Punya pertanyaan seputar layanan Wahyu Laundry? Temukan jawabannya di bawah ini.</p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq) => {
            const isOpen = activeFaqId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => onToggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm md:text-base">{faq.question}</span>
                  <div className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : ""}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Content Area dengan transisi tinggi */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 border-t border-slate-50" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-xs md:text-sm text-slate-500 leading-relaxed bg-slate-50/50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}