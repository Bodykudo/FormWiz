import { create } from 'zustand';

interface usePublishModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: number | null;
  setId: (id: number) => void;
}

export const usePublishModal = create<usePublishModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  id: null,
  setId: (id) => set({ id }),
}));
