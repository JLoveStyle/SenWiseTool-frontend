
// libs

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// local import
import { UserType } from '@/types/api-types'

// interface IUser {
//     currentUser: UserType | null;
//     setCurrentUser: (user: UserType) => void;
// }

// export const useUserStore = create<IUser>((set) => ({
//     currentUser: null,
//     setCurrentUser: (user) => {
//         return set((state) => ({ ...state, currentUser: user }))
//     },
// }))




export interface IUser {
    user: UserType | null
    setUser: (user: UserType | null) => void
}

console.log("hit user store")

export const useUsertore = create<IUser>()((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
}))
