
// libs

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// local import
import { CampaignType, UserType } from '../../types/api-types';


export interface ICampaign {
    campaign: CampaignType | null
    setCampaign: (campaign: CampaignType | null) => void
}

console.log("hit campaign store")

export const useCampaignStore = create<ICampaign>()((set) => ({
    campaign: null,
    setCampaign: (campaign) => set(() => ({ campaign })),
}))
