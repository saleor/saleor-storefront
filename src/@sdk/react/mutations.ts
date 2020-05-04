import { mutationFactory } from "./useMutation";

export const useSignIn = mutationFactory("signIn");
export const useSignOut = mutationFactory("signOut");

// Address mutations
export const useDefaultUserAddress = mutationFactory("setUserDefaultAddress");
export const useDeleteUserAddresss = mutationFactory("setDeleteUserAddress");
export const useCreateUserAddress = mutationFactory("setCreateUserAddress");
export const useUpdateUserAddress = mutationFactory("setUpdateuserAddress");

// Checkout mutations
/**
 * @deprecated Use useCheckout hook instead
 */
export const useCreateCheckout = mutationFactory("setCreateCheckout");
/**
 * @deprecated Use useCheckout hook instead
 */
export const useUpdateCheckoutBillingAddress = mutationFactory(
  "setCheckoutBillingAddress"
);
/**
 * @deprecated Use useCheckout hook instead
 */
export const useUpdateCheckoutLine = mutationFactory("setCheckoutLine");
/**
 * @deprecated Use useCheckout hook instead
 */
export const useUpdateCheckoutShippingAddress = mutationFactory(
  "setCheckoutShippingAddress"
);
/**
 * @deprecated Use useCheckout hook instead
 */
export const useAddCheckoutPromoCode = mutationFactory(
  "setAddCheckoutPromoCode"
);
/**
 * @deprecated Use useCheckout hook instead
 */
export const useRemoveCheckoutPromoCode = mutationFactory(
  "setRemoveCheckoutPromoCode"
);

// User mutations
export const usePasswordChange = mutationFactory("setPasswordChange");
export const useAccountUpdate = mutationFactory("setAccountUpdate");

export const useSetPassword = mutationFactory("setPassword");
