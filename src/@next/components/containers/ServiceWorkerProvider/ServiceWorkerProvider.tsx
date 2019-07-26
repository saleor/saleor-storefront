import React from "react";

import { useServiceWorker } from "@hooks";

import { ServiceWorkerContext } from ".";
import { IProps } from './types';

export const ServiceWorkerProvider: React.FC<IProps> = ({ children, timeout }) => {
  const context = useServiceWorker({ timeout });
  return (
    <ServiceWorkerContext.Provider value={context}>
      {children}
    </ServiceWorkerContext.Provider>
  );
};
