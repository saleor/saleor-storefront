import { NavLinkProps } from "react-router-dom";

import { PartialBy } from "@utils/tsUtils";

export interface IProps extends PartialBy<NavLinkProps, "to"> {
  // TODO: add types
  fullWidth?: boolean;
  item: any;
}
