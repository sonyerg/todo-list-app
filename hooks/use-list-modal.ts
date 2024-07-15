import { create } from "zustand";

interface useListModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useListModal = create<useListModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
