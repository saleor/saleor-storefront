import React from "react";
import { register, unregister } from "register-service-worker";

export const useServiceWorker = ({ timeout = 1000 }) => {
  const [updateAvailable, setUpdateAvailable] = React.useState<boolean>(false);
  const [registration, setRegistration] = React.useState<any>(null);

  React.useEffect(() => {
    const interval: number = setInterval(() => {
      if (registration) {
        registration.update();
      }
    }, timeout);
    return () => clearInterval(interval);
  }, [registration]);

  const registered = (registration: any) => setRegistration(registration);
  const updated = () => setUpdateAvailable(true);

  React.useEffect(() => {
    register("/service-worker.js", { registered, updated });
    return () => unregister();
  }, []);

  return { updateAvailable };
};
