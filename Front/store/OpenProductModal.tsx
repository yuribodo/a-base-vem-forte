import { create } from "zustand";

export type State = {
    isModalOpen: boolean;
}

export type Action  = {
    setIsModalOpen: (isModalOpen: State['isModalOpen']) => void;
}

const useIsOpenModalStore = create<State & Action>((set) => ({
    isModalOpen: false,
    setIsModalOpen: (isModalOpen) => set({ isModalOpen })
}));

export default useIsOpenModalStore;