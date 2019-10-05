import { queryFactory, queryWithVariablesFactory } from "./useQuery";

export const useProductDetails = queryWithVariablesFactory("getProductDetails");

export const useUserDetails = queryFactory("getUserDetails");

export const useUserCheckout = queryFactory("getUserCheckout");

export const useCheckoutDetails = queryWithVariablesFactory(
  "getCheckoutDetails"
);

export const useOrderDetails = queryWithVariablesFactory("getOrderDetails");
export const useOrdersByUser = queryWithVariablesFactory("getOrdersByUser");
