import { create } from "zustand";

interface usePremiumStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePremium = create<usePremiumStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
