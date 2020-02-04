import { CategoryDetails_category } from "@sdk/queries/types/CategoryDetails";
import { ProductList_products } from "@sdk/queries/types/ProductList";
import { IFilterAttributes, IFilters } from "@types";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

export interface IProps {
  products: ProductList_products;
  loading: boolean;
  canLoadMore: boolean;
  loadMoreText?: string;
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  category: CategoryDetails_category;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
}
