import { queryFactory, queryWithVariablesFactory } from "./useQuery";

export const useProductDetails = queryWithVariablesFactory("getProductDetails");
export const useProductList = queryWithVariablesFactory("getProductList");

export const useUserDetails = queryFactory("getUserDetails");

export const useUserCheckout = queryFactory("getUserCheckout");

export const useCheckoutDetails = queryWithVariablesFactory(
  "getCheckoutDetails"
);

export const useOrderDetails = queryWithVariablesFactory("getOrderDetails");
export const useOrdersByUser = queryWithVariablesFactory("getOrdersByUser");

export const useCategoryDetails = queryWithVariablesFactory(
  "getCategoryDetails"
);

export const useAtrributes = queryWithVariablesFactory("getAttributes");

export const useVariantsProducts = queryWithVariablesFactory(
  "getVariantsProducts"
);

export const useUserWishlist = queryWithVariablesFactory("getUserWishlist");
