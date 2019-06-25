import React from "react";

import { ServiceWorkerContext } from ".";
import { useServiceWorker } from "../../hooks";
import { IProps } from './types';

const ServiceWorkerProvider: React.FC<IProps> = ({ children, timeout }) => {
  const context = useServiceWorker({ timeout });
  return (
    <ServiceWorkerContext.Provider value={context}>
      {children}
    </ServiceWorkerContext.Provider>
  );
};

export default ServiceWorkerProvider;
