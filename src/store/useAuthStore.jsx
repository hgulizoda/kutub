import { create } from "zustand";

const useAuthStore = create((set) => ({
  auth: JSON.parse(window.localStorage.getItem("auth")),
  tokens: JSON.parse(window.localStorage.getItem("tokens")),
  user: JSON.parse(window.localStorage.getItem("user")),
  logIn: (tokens) => {
    window.localStorage.setItem("tokens", JSON.stringify(tokens));
    window.localStorage.setItem("auth", JSON.stringify(true));
  },
  logOut: () => {
    set({ auth: false, tokens: null });
    window.localStorage.clear;
  },
  setUser: (user) => {
    set({ user });
    window.localStorage.setItem("user", JSON.stringify(user));
  },
}));

export default useAuthStore;
