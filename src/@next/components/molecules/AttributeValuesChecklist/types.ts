import { IFilterAttributeValue } from "@types";

export interface IProps {
  title?: React.ReactNode;
  name: string;
  values: IFilterAttributeValue[];
  valuesShowLimit?: boolean;
  valuesShowLimitNumber?: number;
  onValueClick: (value: IFilterAttributeValue) => void;
}
