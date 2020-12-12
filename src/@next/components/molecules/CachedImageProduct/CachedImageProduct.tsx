import React from "react";

import { SideBySideMagnifier } from "react-image-magnifiers";

import { PlaceholderImage } from "@components/atoms";
import { useNetworkStatus } from "@hooks";
import NoPhoto from "images/no-photo.svg";

import { IImage } from "@types";

export const CachedImageProduct: React.FC<IImage> = ({
  url,
  url2x,
  alt,
  children,
  defaultImage = NoPhoto,
  ...props
}: IImage) => {
  const [isUnavailable, setUnavailable] = React.useState(false);
  const { online } = useNetworkStatus();

  React.useEffect(() => {
    updateAvailability();
  }, [online]);

  async function updateAvailability() {
    let _isUnavailable = false;
    if ("caches" in window) {
      if (!online) {
        const match = await window.caches.match(url!);
        let match2x;
        if (url2x) {
          match2x = await window.caches.match(url2x);
        }
        if (!match && !match2x) {
          _isUnavailable = true;
        }
      }
    }

    if (isUnavailable !== _isUnavailable) {
      setUnavailable(_isUnavailable);
    }
  }

  if (!url || isUnavailable) {
    return children || <PlaceholderImage alt={alt} />;
  }

  return (
    <SideBySideMagnifier
      imageSrc={url}
      imageAlt="Example"
      alwaysInPlace
      largeImageSrc={url} // Optional
    />
  );
};
