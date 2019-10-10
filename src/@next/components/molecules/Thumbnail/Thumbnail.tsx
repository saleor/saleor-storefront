import React from "react";

import { maybe } from "@utils/misc";

import { PlaceholderImage } from "@components/atoms";
import { CachedImage } from "../";
import { IProps } from "./types";

export const Thumbnail: React.FC<IProps> = ({
  source,
  children,
  ...props
}: IProps) => {
  if (!source.thumbnail && !source.thumbnail2x) {
    return <PlaceholderImage />;
  }
  return (
    <CachedImage
      {...props}
      url={maybe(() => source.thumbnail.url)}
      url2x={maybe(() => source.thumbnail2x.url)}
      alt={maybe(() => source.thumbnail.alt, "")}
    >
      {children}
    </CachedImage>
  );
};
