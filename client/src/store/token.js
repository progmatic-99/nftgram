import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const tokenStore = (set) => ({
  accessToken: null,
  addAccessToken: (token) => set(() => ({ accessToken: token })),
  removeAccessToken: () =>
    set(() => ({
      accessToken: null,
    })),
});

export const useToken = create(persist(tokenStore, { name: "token" }));
