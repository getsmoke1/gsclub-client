import { create } from "zustand";

interface FilterState {
  activeProductType?: string;
  brandId?: string;
  flavorId?: string;
  puffsId?: string;
  nicotineId?: string;
  setFilters: (newFilters: Partial<FilterState>) => void;
  clearFilters: () => void;
  removeFilter: (filterName: keyof Omit<FilterState, 'setFilters' | 'clearFilters' | 'removeFilter' | 'activeProductType'>) => void;
  setActiveProductType: (pt: string) => void;
}

export const useFilter = create<FilterState>((set) => ({
  activeProductType: undefined,
  brandId: undefined,
  flavorId: undefined,
  puffsId: undefined,
  nicotineId: undefined,

  setFilters: (newFilters) => set((state) => ({ ...state, ...newFilters })),

  clearFilters: () =>
    set((state) => ({
      activeProductType: state.activeProductType,
      brandId: undefined,
      flavorId: undefined,
      puffsId: undefined,
      nicotineId: undefined,
    })),

  removeFilter: (filterName) =>
    set((state) => ({ ...state, [filterName]: undefined })),

  setActiveProductType: (pt: string) => set({ activeProductType: pt }),
}));
