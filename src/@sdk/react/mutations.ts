import { mutationFactory } from "./useMutation";

export const useSignIn = mutationFactory("signIn");

// Address mutations
export const useDefaultUserAddress = mutationFactory("setUserDefaultAddress");
export const useDeleteUserAddresss = mutationFactory("setDeleteUserAddress");
export const useCreateUserAddress = mutationFactory("setCreateUserAddress");
export const useUpdateUserAddress = mutationFactory("setUpdateuserAddress");

// Checkout mutations
export const useCreateCheckout = mutationFactory("setCreateCheckout");
export const useUpdateCheckoutBillingAddress = mutationFactory(
  "setCheckoutBillingAddress"
);
export const useUpdateCheckoutShippingAddress = mutationFactory(
  "setCheckoutShippingAddress"
);

// User mutations
export const usePasswordChange = mutationFactory("setPasswordChange");
export const useAccountUpdate = mutationFactory("setAccountUpdate");
