import { create } from "zustand";

const useModalStore = create((set) => ({
  opened: false,
  open: () => set({ opened: true }),
  close: () => set({ opened: false }),
}));

export default useModalStore;
