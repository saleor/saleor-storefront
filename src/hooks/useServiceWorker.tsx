import React from "react";
import { register, unregister } from 'register-service-worker';

const useServiceWorker = () => {
  const [ updateAvailable, setUpdateAvailable ] = React.useState<boolean>(false);
  const [ registration, setRegistration ] = React.useState<any>(null);

  React.useEffect(() => {
    const interval: number = setInterval(() => {
      if (registration) {
        registration.update()
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [registration]);

  const registered = registration => setRegistration(registration);
  const updated = () => setUpdateAvailable(true);

  React.useEffect(() => {
    register('/service-worker.js', { registered, updated });
    return () => unregister()
  }, [])

  return { updateAvailable };
};

export default useServiceWorker;
