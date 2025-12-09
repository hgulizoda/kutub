import { create } from "zustand";

const useModalControl = create((set) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
  toggleModal: () => set((state) => ({ open: !state.open })),
}));

export default useModalControl;
