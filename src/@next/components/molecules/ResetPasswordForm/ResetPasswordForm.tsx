import React from "react";

import { Button } from "@components/atoms";
import { TextField } from "../TextField";

import * as S from "./styles";
import { IProps } from "./types";

import { commonMessages } from "@saleor/intl"
import { FormattedMessage, useIntl } from "react-intl";

export const ResetPasswordForm: React.FC<IProps> = ({
  handleBlur,
  handleChange,
  handleSubmit,
  values,
  tokenError,
  passwordError,
  errors,
}: IProps) => {
  const intl = useIntl();

  return (
    <S.Wrapper>
      <h3>
        <FormattedMessage
          defaultMessage="Reset your password"
        />
      </h3>

      <p>
        <FormattedMessage
          defaultMessage="Please provide new password"
        />
      </p>
      {tokenError && (
        <S.GeneralError>
          <FormattedMessage
            defaultMessage="It seems that token for password reset is not valid anymore"
          />
        </S.GeneralError>
      )}
      <form onSubmit={handleSubmit}>
        <S.InputFields>
          <TextField
            label={intl.formatMessage(commonMessages.password)}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            errors={
              errors.password || passwordError
                ? [
                    {
                      field: "password",
                      message: errors.password || passwordError,
                    },
                  ]
                : undefined
            }
          />
          <TextField
            label={intl.formatMessage({defaultMessage: "Retype password"})}
            onBlur={handleBlur}
            name="retypedPassword"
            onChange={handleChange}
            type="password"
            value={values.retypedPassword}
            errors={
              errors.retypedPassword
                ? [
                    {
                      field: "retypedPassword",
                      message: errors.retypedPassword,
                    },
                  ]
                : undefined
            }
          />
        </S.InputFields>

        <Button type="submit" fullWidth={true}>
          <FormattedMessage
            defaultMessage="SET NEW PASSWORD"
          /> 
        </Button>
      </form>
    </S.Wrapper>
  );
};
