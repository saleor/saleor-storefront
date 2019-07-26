import { createContext } from "react";

import { IServiceWorkerContext } from "./types";

export const ServiceWorkerContext = createContext<IServiceWorkerContext>({
  updateAvailable: false,
});
