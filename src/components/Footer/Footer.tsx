/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";

import { SOCIAL_MEDIA } from "../../core/config";
import { SocialMediaIcon } from "..";
// import Nav from "./Nav";
import Email from "./Email";
import SiteMap from "./SiteMap";

import "./scss/index.scss";

const Footer: React.FC = () => (
  <div className="footer" id="footer">
    <div className="container">
      <Email />
      <SiteMap />
      <div className="footer__favicons">
        <div className="favicons-col-left favicons-col">
          <div className="social-main">
            <span className="sociality-text">Download:</span>
            <a href="#" className="app-store">
              Available on the App Store
            </a>
            <a href="#" className="android">
              Available on Android
            </a>
          </div>
        </div>
        <div className="favicons-col-right favicons-col">
          <div className="favicons-col-main">
            <span className="sociality-text">Follow Us:</span>
            {SOCIAL_MEDIA.map(medium => (
              <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
            ))}
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        © 2021 Thachsanh. All rights reserved.
      </div>
      {/* <Nav /> */}
    </div>
  </div>
);

export default Footer;
