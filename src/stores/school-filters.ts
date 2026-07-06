import { create } from 'zustand';

interface SchoolFiltersState {
  search: string;
  setSearch: (search: string) => void;
  clearSearch: () => void;
}

export const useSchoolFilters = create<SchoolFiltersState>()((set) => ({
  search: '',
  setSearch: (search) => set({ search }),
  clearSearch: () => set({ search: '' }),
}));
