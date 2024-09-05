
// libs

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// local import
import { PricePlanType } from '@/types/api-types'


interface PriceType {
    price_plan: PricePlanType | null;
    setPricePlan: (price_plan: PricePlanType) => void;
}

export const usePriceStore = create<PriceType>((set) => ({
    price_plan: null,
    setPricePlan: (price_plan) => {
        return set((state) => ({ ...state, price_plan }))
    },
}));


