import { create } from 'zustand';

interface userPreviewModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const userPreviewModal = create<userPreviewModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
