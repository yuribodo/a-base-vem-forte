import { create } from "zustand";

interface ModalStore {
  isOpenModal: boolean;
  selectedProductId: number | null;
  setIsOpenModal: (value: boolean) => void;
  setSelectedProductId: (id: number | null) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpenModal: false,
  selectedProductId: null,
  setIsOpenModal: (value: boolean) => set({ isOpenModal: value }),
  setSelectedProductId: (id: number | null) => set({ selectedProductId: id }),
}));

export default useModalStore;
