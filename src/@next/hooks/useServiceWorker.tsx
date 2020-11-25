import React from "react";
// import { register, unregister } from "register-service-worker";

// TODO: USE next-offline
export const useServiceWorker = ({ timeout = 1000 }) => {
  const [updateAvailable] = React.useState<boolean>(false);
  // const [updateAvailable, setUpdateAvailable] = React.useState<boolean>(false);
  // const [registration, setRegistration] = React.useState<any>(null);

  // React.useEffect(() => {
  //   const interval: number = setInterval(() => {
  //     if (registration) {
  //       registration.update();
  //     }
  //   }, timeout);
  //   return () => clearInterval(interval);
  // }, [registration]);
  //
  // const registered = (registration: any) => setRegistration(registration);
  // const updated = () => setUpdateAvailable(true);
  //
  // React.useEffect(() => {
  //   if (window.Cypress || !process.env.SERVICE_WORKER_EXISTS) {
  //     unregister();
  //   } else {
  //     register("/service-worker.js", { registered, updated });
  //     return () => unregister();
  //   }
  // }, []);

  return { updateAvailable };
};
