import "./scss/index.scss";

import CookieConsent from "react-cookie-consent";

import * as React from "react";

import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
import Nav from "./Nav";

const Footer: React.FC = () => (
  <div className="footer" id="footer">
    <div className="footer__favicons container">
      {SOCIAL_MEDIA.map(medium => (
        <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
      ))}
    </div>
    <Nav />
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="myAwesomeCookieName25"
      style={{ background: "#fafafa", textAlign: "center" }}
      contentStyle={{ margin: "10px" }}
      expires={30}
      buttonStyle={{
        color: "#ffffff",
        fontSize: "15px",
        background: "#0D233F",
      }}
    >
      <span style={{ fontSize: "0.7rem", color: "#000000" }}>
        We use cookies to elevate your user experience. By continuing to use our
        site, you accept our use of cookies.
      </span>
    </CookieConsent>
  </div>
);

export default Footer;
