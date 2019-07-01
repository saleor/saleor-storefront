import { MUTATIONS } from "../mutations";
import { mutationFactory } from "./useMutation";

// mutation hooks
export const useSignIn = mutationFactory(MUTATIONS.TokenAuth);
