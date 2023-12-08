import { create } from 'zustand';

interface usePreviewModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePreviewModal = create<usePreviewModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
