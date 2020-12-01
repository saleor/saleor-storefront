import React from "react";

import { maybe } from "@utils/misc";

import { PlaceholderImage } from "@components/atoms";
import { CachedImage } from "..";
import { IProps } from "./types";

export const ThumbnailCollection: React.FC<IProps> = ({
  source,
  children,
  ...props
}: IProps) => {
  const { backgroundImage } = source;

  if (!backgroundImage) {
    return <PlaceholderImage />;
  }

  return (
    <CachedImage
      {...props}
      url={maybe(() => backgroundImage!.url)}
      alt={maybe(() => backgroundImage!.alt)}
    >
      {children}
    </CachedImage>
  );
};
