import React from "react";

import FacebookIcon from "images/facebook-icon.svg";

import { SocialMediaIcon } from ".";
import { createStory } from "../baseStory";

const FACEBOOK_MEDIUM = {
  ariaLabel: "facebook",
  href: "https://www.facebook.com/mirumeelabs/",
  path: FacebookIcon,
};

createStory("SocialMediaIcon").add("default", () => (
  <SocialMediaIcon medium={FACEBOOK_MEDIUM} key={FACEBOOK_MEDIUM.ariaLabel} />
));
