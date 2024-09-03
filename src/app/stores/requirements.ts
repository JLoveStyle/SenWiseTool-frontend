import { ChapterMetaData } from '@/components/atoms/columnsProject'
import { create } from 'zustand'

interface StoreType {
  requirement: any,
  setRequirement: (req: any) => void
}

const useRequirement = create<StoreType>((set) => ({
  requirement: [],
  setRequirement: (req) => set(() => ({ requirement: req }))
}))
export default useRequirement