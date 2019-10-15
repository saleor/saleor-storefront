import { IFilterAttributes, IFilters } from "@types";
export interface IProps {
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  filtersLimit?: number;
  filters: IFilters;
  attribute: IFilterAttributes;
}
