import { useSaleorSDK } from ".";
import { SaleorSDK } from "..";

const useHook = <T extends keyof SaleorSDK>(
  dataName: T
): (() => SaleorSDK[T]) => {
  const saleor = useSaleorSDK();

  const getHookData = () => {
    return saleor[dataName];
  };

  return getHookData;
};

export const hookFactory = <T extends keyof SaleorSDK>(dataName: T) =>
  useHook(dataName);
