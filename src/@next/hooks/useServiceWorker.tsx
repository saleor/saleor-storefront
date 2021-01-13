import { useEffect, useState } from "react";
import { register, unregister } from "register-service-worker";

export const useServiceWorker = ({ timeout = 1000 }) => {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const [registration, setRegistration] = useState<any>(null);

  useEffect(() => {
    const interval: number = setInterval(() => {
      if (registration) {
        registration.update();
      }
    }, timeout);
    return () => clearInterval(interval);
  }, [registration]);

  const registered = (registration: any) => setRegistration(registration);

  const updated = () => setUpdateAvailable(true);

  useEffect(() => {
    if (window.Cypress || !process.env.SERVICE_WORKER_EXISTS) {
      unregister();
    } else {
      register(process.env.SERVICE_WORKER_URL!, { registered, updated });
      return () => unregister();
    }
  }, []);

  return { updateAvailable };
};
