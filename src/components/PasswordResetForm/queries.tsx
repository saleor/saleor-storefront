import gql from "graphql-tag";
import { TypedMutation } from "../../core/mutations";
import { ResetPassword, ResetPasswordVariables } from "./types/ResetPassword";

// fixme: this will be fixed in issue https://github.com/mirumee/saleor-storefront/issues/500
const passwordResetMutation = gql`
  mutation ResetPassword($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      errors {
        field
        message
      }
    }
  }
`;

export const TypedPasswordResetMutation = TypedMutation<
  ResetPassword,
  ResetPasswordVariables
>(passwordResetMutation);
