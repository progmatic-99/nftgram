import create from "zustand";

const useStore = create((set) => ({
  user: null,
  addUser: () => set((state) => ({ user: state.user })),
  removeUser: () => set({ user: null }),
}));

const useToken = create((set) => ({
  accessToken: null,
  addAccessToken: () => set((state) => ({ accessToken: state.accessToken })),
  removeAccessToken: () => set({ accessToken: null }),
  refreshToken: null,
  addRefreshToken: () => set((state) => ({ refreshToken: state.refreshToken })),
  removeRefreshToken: () => set({ refreshToken: null }),
}));

export { useStore, useToken };
