import { ICheckoutStep } from "@types";

export interface IProps {
  steps: ICheckoutStep[];
  activeStep: number;
}
