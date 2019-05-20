import * as React from "react";

import { INavItem, MobileNavList, Overlay, OverlayContextInterface } from "..";
import { useSwipeable } from "react-swipeable";

const MobileNav: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay
}) => {
  const items: INavItem[] = overlay.context.data;
  const config = {
    delta: 50
  };
  const handlers = useSwipeable({
    onSwipedLeft: eventData => overlay.hide(),
    ...config
  });

  return (
    <div {...handlers}>
      <Overlay context={overlay}>
        <div className="side-nav" onClick={evt => evt.stopPropagation()}>
          <MobileNavList items={items} hideOverlay={overlay.hide} />
        </div>
      </Overlay>
    </div>
  );
};

export default MobileNav;
