import { NavLinkProps } from "react-router-dom";

import { PartialBy } from "@utils/tsUtils";

export type LinkType = "main" | "side";

export interface IProps extends PartialBy<NavLinkProps, "to"> {
  // TODO: add types
  type?: LinkType;
  fullWidth?: boolean;
  item: any;
}
