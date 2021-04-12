import * as React from "react";
import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
// import Nav from "./Nav";
import Email from "./Email";
import "./scss/index.scss";
import SiteMap from "./SiteMap";



const Footer: React.FC = () => (
  <div className="footer" id="footer">
    <div className="container">
      <Email />
      <SiteMap />
      <div className="footer__favicons">
        <div className="favicons-col">
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
        <div className="favicons-col">
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
