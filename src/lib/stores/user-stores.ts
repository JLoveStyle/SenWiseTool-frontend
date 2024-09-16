
// libs

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// local import
import { UserType } from '../../types/api-types'

export interface IUser {
    user: UserType | null
    setUser: (user: UserType | null) => void
}

console.log("hit user store")

export const useUsertore = create<IUser>()((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
}))
