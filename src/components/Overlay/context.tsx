import * as React from "react";

export enum OverlayType {
  cart = "cart",
  checkout = "checkout",
  login = "login",
  message = "message",
  sideNav = "sideNav",
  password = "password",
  search = "search",
  topNav = "top-nav"
}

export enum OverlayTheme {
  left = "left",
  right = "right",
  modal = "modal"
}

export interface ContextInterface {
  title?: string;
  content?: string | React.Component;
  status?: "success" | "error";
}

export type ShowOverlayType = (
  type: OverlayType,
  theme?: OverlayTheme,
  context?: ContextInterface
) => void;

export interface OverlayContextInterface {
  type: OverlayType | null;
  theme: OverlayTheme | null;
  context: ContextInterface;
  show: ShowOverlayType;
  hide(): void;
}

/* tslint:disable:no-empty */
export const OverlayContext = React.createContext<OverlayContextInterface>({
  context: null,
  hide: () => {},
  show: type => {},
  theme: null,
  type: null
});
/* tslint:enable:no-empty */
