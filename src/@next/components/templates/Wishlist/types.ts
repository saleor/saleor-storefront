import { Wishlist_me_wishlist_edges_node } from "@sdk/queries/types/Wishlist";
import { IFilterAttributes, IFilters } from "@types";

import { TEMPishlistItem } from "./fixtures";

interface SortOptions {
  value?: string;
  label: string;
}

export interface IFiltering {
  filters: IFilters;
  filterAttributes: IFilterAttributes[];
  activeFilters: number;
  clearFilters: () => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string) => void;
}

export interface ISorting {
  sortOptions: SortOptions[];
  activeSortOption?: string;
  onOrder: (order: { value?: string; label: string }) => void;
}

export interface IProps {
  wishlist: TEMPishlistItem[] | null;
  filtering: IFiltering;
  sorting: ISorting;
  filterSidebarTarget?: HTMLElement | null;
}
