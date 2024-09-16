
// libs

import { create } from 'zustand'
// import { devtools, persist } from 'zustand/middleware'

// local import
import { CampaignType, } from '../../types/api-types';


export interface ICampaign {
    campaigns: CampaignType[] | []
    currentCampaign: CampaignType | null
    setCampaigns: (campaign: CampaignType[] | []) => void;
    setCurrentCampaign: (campaignId: CampaignType | null) => void;
}

console.log("hit campaign store")

export const useCampaignStore = create<ICampaign>()((set) => ({
    campaigns: [],
    currentCampaign: null,
    setCampaigns: (campaign: CampaignType[]) => set(() => ({ campaigns: campaign })),
    setCurrentCampaign: (campaign: CampaignType | null) => set(() => ({ currentCampaign: campaign })),
}))
