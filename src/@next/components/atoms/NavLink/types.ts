import { NavLinkProps } from "react-router-dom";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IProps extends PartialBy<NavLinkProps, "to"> {
  // TODO: add types
  item: any;
}
