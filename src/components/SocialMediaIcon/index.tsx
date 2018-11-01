import * as React from "react";
import ReactSVG from "react-svg";
import "./scss/index.scss";

interface Icon {
  path: string;
  href: string;
}

export interface IconProps extends React.HTMLProps<HTMLAnchorElement> {
  icon: Icon;
  target?: string;
}

const SocialMediaIcon: React.SFC<IconProps> = ({
  icon,
  target,
  ...otherProps
}) => (
  <a href={icon.href} target={target || "_blank"} {...otherProps}>
    <ReactSVG path={icon.path} className="social-icon" />
  </a>
);

export default SocialMediaIcon;
