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

  const { thumbnail, thumbnail2x } = source;

  return (
    <CachedImage
      {...props}
      url={maybe(() => thumbnail!.url)}
      url2x={maybe(() => thumbnail2x!.url)}
      alt={maybe(() => (thumbnail!.alt ? thumbnail!.alt : ""), "")}
    >
      {children}
    </CachedImage>
  );
};
