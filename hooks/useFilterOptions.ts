import { create } from "zustand";

interface FilterOption {
  id: string;
  name: string;
}

interface FilterOptions {
  brands: FilterOption[];
  flavors: FilterOption[];
  puffs: FilterOption[];
  nicotineLevels: FilterOption[];
}

interface FilterOptionsState {
  // Cache keyed by productType (e.g. "VAPES", "PODS", "HOOKAH")
  cache: Record<string, FilterOptions>;
  loading: boolean;
  error: string | null;
  // Load options for a given productType — no-ops if already cached
  loadOptions: (productType?: string) => Promise<void>;
  clearCache: () => void;
}

export const useFilterOptions = create<FilterOptionsState>((set, get) => ({
  cache: {},
  loading: false,
  error: null,

  loadOptions: async (productType?: string) => {
    const key = productType || "__all__";
    const { cache } = get();

    // Already cached — do nothing
    if (cache[key]) return;

    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams();
      if (productType) params.append("productType", productType);
      const res = await fetch(`/api/products/filter-options?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch filter options");
      const data: FilterOptions = await res.json();
      set((state) => ({
        cache: { ...state.cache, [key]: data },
        loading: false,
      }));
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Error", loading: false });
    }
  },

  clearCache: () => set({ cache: {} }),
}));
