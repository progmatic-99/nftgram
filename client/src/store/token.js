import create from "zustand";
import { persist } from "zustand/middleware";

const tokenStore = (set) => ({
  accessToken: null,
  addAccessToken: (token) => set((state) => ({ accessToken: token }), true),
  removeAccessToken: () => set({ accessToken: null }),
});

export const useToken = create(persist(tokenStore, { name: "token" }));
