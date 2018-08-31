import * as React from "react";
import { Query } from "react-apollo";
import ReactSVG from "react-svg";

import { Overlay } from "..";
import { OverlayContext, OverlayType } from "../App/context";

const SearchOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlayContext => {
      if (overlayContext.type === OverlayType.search) {
        return (
          <Overlay onClose={overlayContext.hide}>
            <div className="search" onClick={e => e.stopPropagation()}>
              sdasd
            </div>
          </Overlay>
        );
      }
    }}
  </OverlayContext.Consumer>
);

export default SearchOverlay;
