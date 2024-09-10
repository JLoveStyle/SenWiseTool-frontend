
// libs

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// local import
import { UserType } from '@/types/api-types'

interface IUser {
    currentUser: UserType | null;
    setCurrentUser: (user: UserType) => void;
}

const useUserStore = create<IUser>((set) => ({
    currentUser: null,
    setCurrentUser: (user) => {
        return set((state) => ({ ...state, currentUser: user }))
    },
}))

export default useUserStore;

interface UserState {
    user: IUser | null
    setUser: (user: IUser | null) => void
}

export const useUsertore = create<UserState>()((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
}))
