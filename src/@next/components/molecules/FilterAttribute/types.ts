import { Filters } from "../../../../components/ProductFilters";
interface Attribute {
  slug: string;
  name: string;
}
export interface IProps {
  filters: Filters;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  attribute: {
    slug: string;
    name: string;
    values: Attribute[];
  };
}
