import { create } from "zustand";

interface ModalStore {
  isOpenModal: boolean;
  selectedProductId: number | null;
  setIsOpenModal: (value: boolean) => void;
  setSelectedProductId: (id: number | null) => void;
  updateProductsUI: boolean;
  setUpdateProductsUI: (value: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpenModal: false,
  selectedProductId: null,
  setIsOpenModal: (value: boolean) => set({ isOpenModal: value }),
  setSelectedProductId: (id: number | null) => set({ selectedProductId: id }),
  updateProductsUI: false,
  setUpdateProductsUI: (value: boolean) => set({ updateProductsUI: value }),
}));

export default useModalStore;
