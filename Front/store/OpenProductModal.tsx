import { create } from "zustand";

interface isOpenModalStore {
	isOpenModal: boolean;
	setIsOpenModal: (value: boolean) => void;
}

const useModalStore = create<isOpenModalStore>((set) => ({
	isOpenModal: false,
	setIsOpenModal: (value: boolean) => set({ isOpenModal: value }),
}));

export default useModalStore;
