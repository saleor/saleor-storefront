import { createContext } from "react";

const ServiceWorkerContext = createContext({
  updateAvailable: false,
});

export default ServiceWorkerContext;
