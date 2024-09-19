
// libs

import { create } from 'zustand'

// local import
import { CompanyType } from '../../types/api-types';


export interface ICompany {
    company: CompanyType | null
    setCompany: (company: CompanyType | null) => void
}

const comp: ICompany = {
    company: null,
    setCompany: (company) => { },
}


export const useCompanyStore = create<ICompany>()((set) => ({
    company: null,
    setCompany: (company) => {
        return set(() => ({ company }))
    }
}))
