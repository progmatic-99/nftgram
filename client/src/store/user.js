import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  user: null,
  addUser: (user) => set(() => ({ user: user })),
  removeUser: () => set(() => ({ user: null })),
});

export const useStore = create(persist(store, { name: "user" }));
