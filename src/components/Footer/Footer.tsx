import "./scss/index.scss";

import * as React from "react";

import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
import Nav from "./Nav";

import useLocale from "@saleor/@next/hooks/useLocale";

import Button from "../Button";
import { Locale } from "../Locale/Locale";


const Footer: React.FC = () => {
  const { locale, setLocale } = useLocale();
  return (
  <div className="footer" id="footer">
    <div className="footer__favicons container">
      {SOCIAL_MEDIA.map(medium => (
        <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
      ))}
    </div>
    <Nav />
    {
      locale === Locale.FR? ">" : ""
    }
    <a
      onClick={() => {
        setLocale(Locale.FR)
        }}>Français</a>
        {" | "} 
    {
      locale === Locale.EN? ">" : ""
    }
    <a
      onClick={() => {
        setLocale(Locale.EN)
        }}>English</a>
  </div>
)};

export default Footer;