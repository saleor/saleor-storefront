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
export const useAddCheckoutPromoCode = mutationFactory(
  "setAddCheckoutPromoCode"
);

export const useRemoveCheckoutPromoCode = mutationFactory(
  "setRemoveCheckoutPromoCode"
);

// User mutations
export const usePasswordChange = mutationFactory("setPasswordChange");
export const useAccountUpdate = mutationFactory("setAccountUpdate");

export const useSetPassword = mutationFactory("setPassword");

// Wishlist mutation
export const useAddWishlistProduct = mutationFactory("setAddWishlistProduct");
export const useRemoveWishlistProduct = mutationFactory(
  "setRemoveWishlistProduct"
);
export const useAddWishlistProductVariant = mutationFactory(
  "setAddWishlistProductVariant"
);
export const useAddRemoveWishlistProductVariant = mutationFactory(
  "setRemoveWishlistProductVariant"
);
