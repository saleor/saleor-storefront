import { FilterAttributes, IFilters } from "@types";

export interface IProps {
  attributes: FilterAttributes[];
  filters: IFilters;
  hide: () => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string) => void;
  show: boolean;
  target?: HTMLElement | null;
}
