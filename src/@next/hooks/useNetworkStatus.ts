import React from "react";

export const useNetworkStatus = (cb?: (online?: boolean) => void) => {
  const [online, setOnline] = React.useState(
    "onLine" in navigator ? navigator.onLine : true
  );

  const updateOnlineStatus = () => {
    const status = navigator.onLine;

    if (cb) {
      cb(status);
    }
    setOnline(navigator.onLine);
  };

  React.useEffect(() => {
    addEventListener("offline", updateOnlineStatus);
    addEventListener("online", updateOnlineStatus);

    return () => {
      removeEventListener("offline", updateOnlineStatus);
      removeEventListener("online", updateOnlineStatus);
    };
  }, []);

  return { online };
};
