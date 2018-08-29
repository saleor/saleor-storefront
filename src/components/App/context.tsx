import * as React from "react";

export interface OverlayContextInterface {
  type: "checkout" | "navigation" | null;
  showOverlay(type: "checkout" | "navigation" | null): void;
  closeOverlay(): void;
}

export const OverlayContext = React.createContext<OverlayContextInterface | null>(
  null
);
