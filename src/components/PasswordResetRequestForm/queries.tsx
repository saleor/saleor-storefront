import gql from "graphql-tag";
import { TypedMutation } from "../../core/mutations";
import {
  ResetPasswordRequest,
  ResetPasswordRequestVariables,
} from "./gqlTypes/ResetPasswordRequest";

// fixme: this will be fixed in issue https://github.com/mirumee/saleor-storefront/issues/500
const passwordResetRequestMutation = gql`
  mutation ResetPasswordRequest($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      errors {
        field
        message
      }
    }
  }
`;

export const TypedPasswordResetRequestMutation = TypedMutation<
  ResetPasswordRequest,
  ResetPasswordRequestVariables
>(passwordResetRequestMutation);
