import { IFilterAttributes, IFilters } from "@types";
export interface IProps {
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  filters: IFilters;
  attribute: IFilterAttributes;
}
