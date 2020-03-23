import { SaleorAPI } from "../api";
import { useSaleorClient } from "./helpers";

const useHook = <T extends keyof SaleorAPI>(dataName: T): SaleorAPI[T] => {
  const saleor = useSaleorClient();

  const getHookData = () => {
    return saleor[dataName];
  };

  return getHookData();
};

export const hookFactory = <T extends keyof SaleorAPI>(query: T) => () =>
  useHook(query);
