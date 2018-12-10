import * as React from "react";
import urljoin from "url-join";

import { Button, SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
import BottomNav from "../BottomNav";

import "./scss/index.scss";

const Footer: React.SFC = () => (
  <div className="footer" id="footer">
    <div className="footer__newsletter">
      <div className="container">
        <h4>Subscribe to our newsletter to receive new information</h4>
        <Button secondary>Sign up</Button>
      </div>
    </div>
    <div className="footer__favicons container">
      {SOCIAL_MEDIA.map(medium => (
        <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
      ))}
    </div>
    <footer className="footer__menu">
      <div className="container">
        <BottomNav />
      </div>
    </footer>
  </div>
);

export default Footer;
