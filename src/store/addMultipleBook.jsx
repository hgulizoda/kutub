import { create } from "zustand";

const addMultipleBooks = create((set) => ({
  count: null,
  collectedData: [],
  currentIndex: null,
  formData: {},
  setCount: (count) => set(count),
  close: () => set({ opened: false }),
}));

export default addMultipleBooks;
