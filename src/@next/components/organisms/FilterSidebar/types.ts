import { IFilterAttributes, IFilters } from "@types";

export interface IProps {
  attributes: IFilterAttributes[];
  filters: IFilters;
  hide: () => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string) => void;
  show: boolean;
  target?: HTMLElement | null;
}
