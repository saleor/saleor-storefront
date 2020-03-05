import { SaleorAPI } from "../index";
import { useSaleorClient } from "./helpers";

const useHook = <T extends keyof SaleorAPI>(dataName: T): SaleorAPI[T] => {
  const saleor = useSaleorClient();

  // const handleUnsubscribe = (data: SaleorSDK[T]) => {
  //   data[dataName] = null;
  // };

  // const getHookData = React.useCallback(() => {
  //   saleor[dataName].unsubscribe = () => (saleor[dataName][dataName] = null);

  //   return saleor[dataName];
  // }, [dataName, saleor[dataName]]);

  const getHookData = () => {
    return saleor[dataName];
  };

  return getHookData();
};

export const hookFactory = <T extends keyof SaleorAPI>(query: T) => () =>
  useHook(query);
