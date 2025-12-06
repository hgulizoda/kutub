import { create } from "zustand";

const useAuthStore = create((set) => ({
  auth: false,
  tokens: null,
  user: null,
  logIn: (tokens) => set({ auth: true, tokens }),
  logOut: () => set({ auth: false, tokens: null }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
