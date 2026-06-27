// ⚡ FIX: Menggunakan 'import type' untuk tipe data bawaan React demi mematuhi verbatimModuleSyntax
import { useState, useMemo } from "react";
import type { ChangeEvent } from "react";

interface ServiceItem {
  name: string;
  price: string;
  unit: string;
  badge?: string;
}

export function useLayananCalculator(kiloanServices: ServiceItem[]) {
  const [selectedServicePrice, setSelectedServicePrice] = useState<number>(() => {
    if (kiloanServices.length > 0) {
      return parseInt(kiloanServices[0].price.replace(/[^0-9]/g, ""), 10);
    }
    return 0;
  });
  const [weight, setWeight] = useState<number>(1);

  const totalPrice = useMemo(() => {
    return selectedServicePrice * weight;
  }, [selectedServicePrice, weight]);

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setWeight(isNaN(value) || value < 0 ? 0 : value);
  };

  const handleServiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedServicePrice(parseInt(e.target.value, 10));
  };

  return {
    weight,
    totalPrice,
    handleWeightChange,
    handleServiceChange,
  };
}