import gql from "graphql-tag";
import { TypedMutation } from "../../core/mutations";
import { ResetPassword, ResetPasswordVariables } from "./types/ResetPassword";

// fixme: this will be fixed in issue https://github.com/mirumee/saleor-storefront/issues/500
const passwordResetMutation = gql`
  mutation ResetPassword($email: String!) {
    requestPasswordReset(email: $email, redirectUrl: "http://localhost:3000") {
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
