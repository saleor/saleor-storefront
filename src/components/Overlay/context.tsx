import * as React from "react";

export enum OverlayType {
  cart = "cart",
  checkout = "checkout",
  navigation = "navigation",
  login = "login",
  search = "search"
}

export enum OverlayTheme {
  left = "left",
  right = "right",
  modal = "modal"
}
export interface OverlayContextInterface {
  type: OverlayType | null;
  theme: OverlayTheme | null;
  show(type: OverlayType, theme?: OverlayTheme): void;
  hide(): void;
}

/* tslint:disable:no-empty */
export const OverlayContext = React.createContext<OverlayContextInterface>({
  hide: () => {},
  show: type => {},
  theme: null,
  type: null
});
/* tslint:enable:no-empty */
