import { Project } from '@/types/gestion'
import { create } from 'zustand'

type StoreTye = {
  projects: Project[],
  setProjects: (project: Project[]) => void
}

const useProjects = create<StoreTye>((set) => ({
  projects: [{
    id: "",
    title: "",
    description: "",
    sector_activity: '',
    country: '',
    city: '',
    state: '',
    status: ['DRAFT']
  }],
  setProjects: (pro) => set(() => ({projects: pro}))
}))
export default useProjects