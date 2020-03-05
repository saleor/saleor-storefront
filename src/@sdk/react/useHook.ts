import React from "react";

import { SaleorSDK } from "../index";
import { useSaleorSDK } from "./helpers";

const useHook = <T extends keyof SaleorSDK>(
  dataName: T
): (() => SaleorSDK[T]) => {
  const saleor = useSaleorSDK();

  const getHookData = React.useCallback(() => {
    return saleor[dataName];
  }, [dataName]);

  return getHookData;
};

export const hookFactory = <T extends keyof SaleorSDK>(dataName: T) =>
  useHook(dataName);
