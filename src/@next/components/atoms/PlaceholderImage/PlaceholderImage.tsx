import React from "react";

import NoPhoto from "images/no-photo.svg";
import { IProps } from "./types";

export const PlaceholderImage: React.FC<IProps> = ({
  alt = "placeholder",
}: IProps) => {
  return <img src={NoPhoto} alt={alt} />;
};
