import { FormElementInstance } from '@/types/elements';
import { create } from 'zustand';

interface useDesignerStore {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;

  selectedElement: FormElementInstance | null;
  setSelectedElement: (element: FormElementInstance | null) => void;

  updateElement: (id: string, element: FormElementInstance) => void;
}

export const useDesigner = create<useDesignerStore>((set) => ({
  elements: [],
  addElement: (index: number, element: FormElementInstance) => {
    const newElements = [...useDesigner.getState().elements];
    newElements.splice(index, 0, element);
    set({ elements: newElements });
  },

  removeElement: (id: string) => {
    set({
      elements: useDesigner
        .getState()
        .elements.filter((element) => element.id !== id),
    });
  },

  selectedElement: null,
  setSelectedElement: (element: FormElementInstance | null) => {
    set({ selectedElement: element });
  },

  updateElement: (id: string, element: FormElementInstance) => {
    const newElements = [...useDesigner.getState().elements];
    const index = newElements.findIndex((element) => element.id === id);
    newElements[index] = element;
    set({ elements: newElements });
  },
}));
