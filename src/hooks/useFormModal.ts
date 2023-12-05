import { create } from 'zustand';

interface useFormModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useFormModal = create<useFormModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
