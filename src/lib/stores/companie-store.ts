
// libs

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// local import
import { CompanyType, } from '@/types/api-types'


interface ICompany {
    company: CompanyType | null;
    setCompany: (company: CompanyType) => void;
}

export const useCompanyStore = create<ICompany>((set) => ({
    company: null,
    setCompany: (company) => {
        return set((state) => ({ ...state, company }))
    },
}));


