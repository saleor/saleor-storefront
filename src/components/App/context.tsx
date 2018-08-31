import * as React from "react";

export enum OverlayType {
  cart,
  checkout,
  navigation,
  search
}
export interface OverlayContextInterface {
  type: OverlayType | null;
  show(type: OverlayType): void;
  hide(): void;
}

/* tslint:disable:no-empty */
export const OverlayContext = React.createContext<OverlayContextInterface>({
  hide: () => {},
  show: type => {},
  type: null
});
/* tslint:enable:no-empty */
