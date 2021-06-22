import React from "react";

import { PlaceholderImage } from "@components/atoms";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNetworkStatus } from "@hooks";
import NoPhoto from "images/no-photo.svg";

import { IImage } from "@types";

export const CachedImage: React.FC<IImage> = ({
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
    <LazyLoadImage
      {...props}
      src={url}
      srcSet={url2x ? `${url} 1x, ${url2x} 2x` : `${url} 1x`}
      alt={alt}
      effect="blur"
      threshold={100}
      // navigator.onLine is not always accurate
      onError={() => setUnavailable(true)}
    />
  );
};
