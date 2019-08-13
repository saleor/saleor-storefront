import { mutationFactory } from "./useMutation";

export const useSignIn = mutationFactory("signIn");

// Address mutations
export const useDefaultUserAddress = mutationFactory("setUserDefaultAddress");
export const useDeleteUserAddresss = mutationFactory("setDeleteUserAddress");
export const useUpdateCheckoutBillingAddress = mutationFactory(
  "setCheckoutBillingAddress"
);
