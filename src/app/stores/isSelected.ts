import {create} from 'zustand'

type StoreTye = {
  deleteProject: boolean,
  setDeleteProject: (val: boolean) => void
}

const useDeleteProject = create<StoreTye>((set) => ({
  deleteProject: false,
  setDeleteProject: (del) => set(() => ({deleteProject: del}))
}))
export default useDeleteProject