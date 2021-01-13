import * as React from "react";

import { SOCIAL_MEDIA } from "../../core/config";
import { SocialMediaIcon } from "..";
import Nav from "./Nav";

import "./scss/index.scss";

const Footer: React.FC = () => (
  <div className="footer" id="footer">
    <div className="footer__favicons container">
      {SOCIAL_MEDIA.map(medium => (
        <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
      ))}
    </div>
    <Nav />
  </div>
);

export default Footer;
