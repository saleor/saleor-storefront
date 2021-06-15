import { Attribute } from "@graphql/gqlTypes/Attribute";
import { IFilters } from "@types";

export interface IProps {
  attributes: Attribute[];
  filters: IFilters;
  hide: () => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string) => void;
  show: boolean;
  target?: HTMLElement | null;
}
