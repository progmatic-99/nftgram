import create from "zustand";
import { persist } from "zustand/middleware";

const store = (set) => ({
  user: null,
  addUser: async (user) => set(() => ({ user: user })),
  removeUser: async () => set(() => ({ user: null })),
});

export const useStore = create(persist(store, { name: "user" }));
