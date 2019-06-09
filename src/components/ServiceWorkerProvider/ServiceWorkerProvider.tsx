import React from "react";

import { ServiceWorkerContext } from ".";
import { useServiceWorker } from "../../hooks";

const ServiceWorkerProvider: React.FC = ({ children }) => {
  const context = useServiceWorker();
  return (
    <ServiceWorkerContext.Provider value={context}>
      {children}
    </ServiceWorkerContext.Provider>
  );
};

export default ServiceWorkerProvider;
