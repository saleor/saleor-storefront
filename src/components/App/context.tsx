import * as React from "react";

export enum OverlayType {
  checkout,
  navigation
}
export interface OverlayContextInterface {
  type: OverlayType | null;
  show(type: OverlayType): void;
  hide(): void;
}

export const OverlayContext = React.createContext<OverlayContextInterface>({
  type: null,
  show: type => {},
  hide: () => {}
});
