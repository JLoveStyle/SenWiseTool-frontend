
// libs

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// local import
import { CompanyType } from '../../types/api-types';


interface ICompany {
    company: CompanyType | null;
    setCompany: (company: CompanyType) => void;
}

console.log("hit company store")
export const useCompanyStore = create<ICompany>((set) => ({
    company: null,
    setCompany: (company) => {
        return set(() => ({ company }))
    },
}));


