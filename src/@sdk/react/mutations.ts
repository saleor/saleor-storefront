import { setAuthToken } from "../auth";
import { MUTATIONS } from "../mutations";
import { TokenAuth, TokenAuthVariables } from "../mutations/types/TokenAuth";
import {
  BaseMutationHookOptions,
  mutationFactory,
  MutationFn,
  MutationResult
} from "./useMutation";

// custom auth mutation
export const useSignIn = (
  variables?: TokenAuthVariables,
  options?: BaseMutationHookOptions<TokenAuth, never>
): [MutationFn<TokenAuth, TokenAuthVariables>, MutationResult<TokenAuth>] => {
  const [signIn, bag] = mutationFactory(MUTATIONS.TokenAuth)(variables, {
    update: (proxy, data) => {
      if (data.data.tokenCreate.token) {
        setAuthToken(data.data.tokenCreate.token);
      }
      if (options && options.update) {
        options.update(proxy, data);
      }
    },
  });

  return [signIn, bag];
};

// mutation hooks
