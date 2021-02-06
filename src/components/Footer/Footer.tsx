import "./scss/index.scss";

import CookieConsent from "react-cookie-consent";
import { usePreferences } from "@hooks";
import * as React from "react";

import { FormattedMessage } from "react-intl";
import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
import Nav from "./Nav";
import NavEN from "./NavEN";

const Footer: React.FC = () => {
  const {
    preferences: { locale },
  } = usePreferences();
  return (
    <div className="footer" id="footer">
      <div className="footer__favicons container">
        {SOCIAL_MEDIA.map(medium => (
          <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
        ))}
      </div>
      {locale === "en" ? <NavEN /> : <Nav />}
      {locale === "en" ? (
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
            flex: "0.3 0 auto",
            margin: "20px",
            padding: "15px 10px",
          }}
        >
          <span style={{ fontSize: "0.9rem", color: "#000000" }}>
            <FormattedMessage
              defaultMessage="By accepting our policy, you help us to deliver a better website
            experience. To see our full privacy policy"
            />
            <a href="/page/privacy-cookie-policies/">
              <FormattedMessage defaultMessage=" Click here" />
            </a>
          </span>
        </CookieConsent>
      ) : (
        <CookieConsent
          location="bottom"
          buttonText="Accetto"
          cookieName="myAwesomeCookieName25"
          style={{ background: "#fafafa", textAlign: "center" }}
          contentStyle={{ margin: "10px" }}
          expires={30}
          buttonStyle={{
            color: "#ffffff",
            fontSize: "15px",
            background: "#0D233F",
            flex: "0.3 0 auto",
            margin: "20px",
            padding: "15px 10px",
          }}
        >
          <span style={{ fontSize: "0.9rem", color: "#000000" }}>
            <FormattedMessage
              defaultMessage="Accettando i nostri termini d'uso, ci aiuti a fornire un'esperienza personalizzata. 
              Visualizza i termini"
            />
            <a href="/page/privacy-cookie-policies/">
              <FormattedMessage defaultMessage=" Clicca qui" />
            </a>
          </span>
        </CookieConsent>
      )}
    </div>
  );
};

export default Footer;
