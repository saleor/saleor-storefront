import React from "react";

import { IProps } from "./types";

export const CachedImage: React.FC<IProps> = ({
  url,
  url2x,
  alt,
  children,
}: IProps) => {
  const [isUnavailable, setUnavailable] = React.useState(false);
  const [online, setOnline] = React.useState(
    "onLine" in navigator ? navigator.onLine : true
  );

  const updateOnlineStatus = () => {
    setOnline(navigator.onLine);
  };

  const updateAvailability = async () => {
    let _isUnavailable = false;
    if ("caches" in window) {
      if (online) {
        const match = await window.caches.match(url);
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
      setUnavailable(isUnavailable);
    }
  };

  const addImagesToCache = () => {
    if ("caches" in window) {
      window.caches
        .open("image-cache")
        .then(cache => cache.addAll([url, url2x || ""]));
    }
  };

  React.useEffect(() => {
    addEventListener("offline", updateOnlineStatus);
    addEventListener("online", updateOnlineStatus);

    return () => {
      removeEventListener("offline", updateOnlineStatus);
      removeEventListener("online", updateOnlineStatus);
    };
  }, []);

  React.useEffect(() => {
    addImagesToCache();
    updateAvailability();
  });

  if (isUnavailable) {
    return children || null;
  }

  return (
    <img
      src={url}
      srcSet={url2x ? `${url} 1x, ${url2x} 2x` : `${url} 1x`}
      alt={alt}
    />
  );
};
