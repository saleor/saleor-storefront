import * as React from "react";

import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";

export const TopNavOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlayContext => {
      if (overlayContext.type === OverlayType.topNavigation) {
        return (
          <Overlay context={overlayContext} />
        );
      }
    }}
  </OverlayContext.Consumer>
);

