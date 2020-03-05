import { SaleorSDK } from "../index";
import { useSaleorSDK } from "./helpers";

const useHook = <T extends keyof SaleorSDK>(dataName: T): SaleorSDK[T] => {
  const saleor = useSaleorSDK();

  // const handleUnsubscribe = (data: SaleorSDK[T]) => {
  //   data[dataName] = null;
  // };

  // const getHookData = React.useCallback(() => {
  //   saleor[dataName].unsubscribe = () => (saleor[dataName][dataName] = null);

  //   return saleor[dataName];
  // }, [dataName, saleor[dataName]]);

  const getHookData = () => {
    saleor[dataName].unsubscribe = () => (saleor[dataName][dataName] = null);

    return saleor[dataName];
  };

  return getHookData();
};

export const hookFactory = <T extends keyof SaleorSDK>(query: T) => () =>
  useHook(query);
