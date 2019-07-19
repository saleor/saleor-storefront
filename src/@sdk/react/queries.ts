import { queryFactory, queryWithVariablesFactory } from "./useQuery";

export const useProductDetails = queryWithVariablesFactory("getProductDetails");

export const useUserDetails = queryFactory("getUserDetails");
