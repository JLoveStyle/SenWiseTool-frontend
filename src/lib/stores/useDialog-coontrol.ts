import {create} from 'zustand';

interface IDialogControl {
	isDialogOpen: boolean
	setIsDialogOpen: (isDialogOpen: boolean) => void
}

export const useDialogControl = create<IDialogControl>((set) => ({
	isDialogOpen: false,
	setIsDialogOpen: (isDialogOpen) => {
		return set(() => ({isDialogOpen}))
	}
}))