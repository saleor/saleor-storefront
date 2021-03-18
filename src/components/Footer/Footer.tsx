import * as React from "react";

import { SOCIAL_MEDIA } from "../../core/config";
import { SocialMediaIcon } from "..";
import { Nav, NavProps } from "./Nav";

import "./scss/index.scss";

type FooterProps = NavProps;

export const Footer: React.FC<FooterProps> = ({ menu }) => (
  <div className="footer" id="footer">
    <div className="footer__favicons container">
      {SOCIAL_MEDIA.map(medium => (
        <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
      ))}
    </div>
    <Nav menu={menu} />
  </div>
);
