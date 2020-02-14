import { IFilterAttributes } from "@types";

export interface IProps {
  show: boolean;
  target?: HTMLElement | null;
  attributes: IFilterAttributes[];
  hide: () => void;
  onAttributeValueClick: (attributeSlug: string, valueSlug: string) => void;
}
