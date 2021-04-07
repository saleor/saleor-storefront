import { IFilterAttribute } from "@types";

export interface IProps {
  title?: React.ReactNode;
  name: string;
  values: IFilterAttribute[];
  valuesShowLimit?: boolean;
  valuesShowLimitNumber?: number;
  onValueClick: (value: IFilterAttribute) => void;
}
