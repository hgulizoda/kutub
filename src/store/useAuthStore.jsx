import { create } from "zustand";

const useAuthStore = create((set) => ({
  auth: JSON.parse(localStorage.getItem("auth")) || false,
  tokens: JSON.parse(localStorage.getItem("tokens")),
  user: JSON.parse(localStorage.getItem("user")),

  logIn: (data) => {
    set({
      auth: true,
      tokens: data.tokens1,
      user: data.user1,
    });

    localStorage.setItem("auth", "true");
    localStorage.setItem("tokens", JSON.stringify(data.tokens1));
    localStorage.setItem("user", JSON.stringify(data.user1));
  },

  logOut: () => {
    set({ auth: false, tokens: null, user: null });
    localStorage.clear();
  },
}));

export default useAuthStore;
