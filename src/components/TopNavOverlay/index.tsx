import * as React from "react";

import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";

const TopNavOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlayContext => {
      if (overlayContext.type === OverlayType.topNav) {
        return (
          <Overlay context={overlayContext} />
        );
      }
    }}
  </OverlayContext.Consumer>
);

export default TopNavOverlay;
