import { ISelect } from "@components/atoms";
import { IFormError } from "@types";

export interface IProps extends ISelect {
  label: string;
  inputProps?: object;
  errors?: IFormError[];
}
