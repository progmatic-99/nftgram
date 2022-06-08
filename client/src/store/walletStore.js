import create from "zustand";
import { persist } from "zustand/middleware";

const walletStore = (set) => ({
  wallet: null,
  addWallet: (wallet) => set(() => ({ wallet: wallet })),
  removeWallet: async () => set(() => ({ wallet: null })),
});

export const useWalletStore = create(persist(walletStore, { name: "wallet" }));
