
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

export const useCampaignStore = create<ICampaign>()((set) => ({
    campaigns: [],
    currentCampaign: null,
    setCampaigns: (campaigns: CampaignType[]) => set(() => ({ campaigns: campaigns })),
    setCurrentCampaign: (campaign: CampaignType | null) => set(() => ({ currentCampaign: campaign })),
}));


