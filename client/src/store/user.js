import create from "zustand";
import { persist } from "zustand/middleware";

const store = (set) => ({
  user: null,
  addUser: (user) => set((state) => ({ user: user })),
  removeUser: () => set({ user: null }),
});

export const useStore = create(persist(store, { name: "user" }));
