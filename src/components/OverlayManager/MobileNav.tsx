import * as React from "react";

import {
  MobileNavItemInterface,
  MobileNavList,
  Overlay,
  OverlayContextInterface
} from "..";

const MobileNav: React.SFC<{ overlay: OverlayContextInterface }> = ({
  overlay
}) => {
  const items: MobileNavItemInterface[] = overlay.context.data;

  return (
    <Overlay context={overlay}>
      <div className="side-nav" onClick={evt => evt.stopPropagation()}>
        <MobileNavList items={items} hideOverlay={overlay.hide} />
      </div>
    </Overlay>
  );
};

export default MobileNav;
