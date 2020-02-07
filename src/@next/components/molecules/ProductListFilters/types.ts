interface SortOptions {
  value?: string;
  label: string;
}
export interface IProps {
  activeSortOption?: string;
  activeFilters: number;
  numberOfProducts: number;
  sortOptions: SortOptions[];
  onChange: (order: { value?: string; label: string }) => void;
  openFiltersMenu: () => void;
  clearFilters: () => void;
}
