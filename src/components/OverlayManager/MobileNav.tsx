import * as React from "react";
import { SOCIAL_MEDIA } from "../../core/config";
import {
  INavItem,
  MobileNavList,
  Overlay,
  OverlayContextInterface,
  SocialMediaIcon,
} from "..";

const MobileNav: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  const items: INavItem[] = overlay.context.data;

  return (
    <Overlay testingContext="mobileNavigationOverlay" context={overlay}>
      <div className="side-nav" onClick={evt => evt.stopPropagation()}>
        <MobileNavList items={items} hideOverlay={overlay.hide} />
      </div>
      <div className="footer__favicons container">
        {SOCIAL_MEDIA.map(medium => (
          <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
        ))}
      </div>
    </Overlay>
  );
};

export default MobileNav;
