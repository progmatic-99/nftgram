import create from "zustand";
import { persist } from "zustand/middleware";

const tokenStore = (set) => ({
  accessToken: null,
  refreshToken: null,
  addAccessToken: (token) => set((state) => ({ accessToken: token })),
  removeAccessToken: () => set({ accessToken: null }),
  addRefreshToken: (token) => set((state) => ({ refreshToken: token })),
  removeRefreshToken: () => set({ refreshToken: null }),
});

export const useToken = create(persist(tokenStore));
