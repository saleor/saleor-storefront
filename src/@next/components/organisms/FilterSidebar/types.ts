import { Filters } from "../../../../components/ProductFilters/";
export interface Attribute {
  id: string;
  name: string | null;
  slug: string | null;
}
export interface AttributeList {
  id: string;
  name: string | null;
  slug: string | null;
  values: Array<Attribute | null> | null;
}
export interface IProps {
  attributes: AttributeList[];
  filters: Filters;
  hide: () => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string) => void;
  show: boolean;
}
