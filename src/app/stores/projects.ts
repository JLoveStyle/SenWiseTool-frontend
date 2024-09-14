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
    status: ['DRAFT'],
    start_date: '',
    end_date: ''
  }],
  setProjects: (pro) => set(() => ({projects: pro}))
}))
export default useProjects