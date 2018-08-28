import * as React from "react";

export interface OverlayContextInterface {
  visible: boolean;
  type?: "checkout" | "navigation";
  showOverlay(type: "checkout" | "navigation"): void;
  closeOverlay(): void;
}

export const OverlayContext = React.createContext<OverlayContextInterface | null>(
  null
);
