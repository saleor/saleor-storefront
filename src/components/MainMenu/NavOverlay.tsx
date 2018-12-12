import * as React from "react";

import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";

const NavOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlayContext => {
      if (overlayContext.type === OverlayType.mainMenuNav) {
        return <Overlay context={overlayContext} />;
      }
    }}
  </OverlayContext.Consumer>
);

export default NavOverlay;
