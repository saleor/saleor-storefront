import { mutationFactory } from "./useMutation";

export const useSignIn = mutationFactory("signIn");

// Address mutations
export const useDefaultUserAddress = mutationFactory("setUserDefaultAddress");
export const useDeleteUserAddresss = mutationFactory("setDeleteUserAddress");

// Checkout mutations
export const useCreateCheckout = mutationFactory("setCreateCheckout");
export const useUpdateCheckoutBillingAddress = mutationFactory(
  "setCheckoutBillingAddress"
);
export const useUpdateCheckoutShippingAddress = mutationFactory(
  "setCheckoutShippingAddress"
);
