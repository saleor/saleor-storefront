import { QUERIES } from "../queries";
import { queryWithVariablesFactory } from "./useQuery";

// query hooks
export const useProductDetails = queryWithVariablesFactory(
  QUERIES.ProductDetails
);

export const useUserDetails = queryWithVariablesFactory(QUERIES.UserDetails);
