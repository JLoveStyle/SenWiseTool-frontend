
// libs

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// local import
import { PricePlanType, RequirementType } from '@/types/api-types'


interface IRequirements {
    requirements: RequirementType[] | [];
    setRequirements: (requirements: RequirementType[]) => void;
}

export const useRequirementsStore = create<IRequirements>()((set) => ({
    requirements: [],
    setRequirements: (data: RequirementType[]) => {
        return set(() => ({ requirements: data }))
    },
}));
