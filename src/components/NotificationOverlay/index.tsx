import * as React from "react";

import { Message } from "..";
import { OverlayContext, OverlayType } from "../Overlay/context";

export const NotificationOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {({ type, context, hide }) =>
      type === OverlayType.message ? (
        <Message title={context.title} status={context.status} onClose={hide} />
      ) : null
    }
  </OverlayContext.Consumer>
);
