import { ISingleFilterAttribute } from "@types";

export interface IProps {
  title?: React.ReactNode;
  name: string;
  values: ISingleFilterAttribute[];
  valuesShowLimit?: boolean;
  valuesShowLimitNumber?: number;
  onValueClick: (value: ISingleFilterAttribute) => void;
}
