import { Category, Filter, Product } from "@/types/product-filter.type";
import { create } from "zustand";

type State = {
  products: Product[];
  categories: Category[];
  filters: Filter[];
  selectedCategories: number[];
  selectedFilters: { filter: number; option: number }[];
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setFilters: (filters: Filter[]) => void;
  setSelectedCategories: (selectedCategories: number[]) => void;
  setSelectedFilters: (
    selectedFilters: { filter: number; option: number }[]
  ) => void;
};

export const useStore = create<State>()((set) => ({
  products: [],
  categories: [],
  filters: [],
  selectedCategories: [],
  selectedFilters: [],
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setFilters: (filters) => set({ filters }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
  setSelectedFilters: (selectedFilters) => set({ selectedFilters }),
}));
