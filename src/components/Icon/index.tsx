import "./scss/index.scss";

import * as React from "react";
import { default as MdIcon } from "@mdi/react";
import { IconProps } from "@mdi/react/dist/IconProps";

export interface MdIconProps extends IconProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Icon: React.FC<MdIconProps> = ({ path, className, ...rest }) => {
  return (
    <div className={className ? `${className} md-icon` : "md-icon"}>
      <MdIcon path={path} {...rest} />
    </div>
  );
};

Icon.defaultProps = {
  size: 1
};

export default Icon;
