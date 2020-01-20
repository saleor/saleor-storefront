import React from "react";

import { Button } from "@components/atoms";
import { TextField } from "../TextField";

import * as S from "./styles";
import { IProps } from "./types";

export const ResetPasswordForm: React.FC<IProps> = ({
  handleBlur,
  handleChange,
  handleSubmit,
  values,
  tokenError,
  passwordError,
  errors,
}: IProps) => {
  return (
    <S.Wrapper>
      <h3>Reset your password</h3>

      <p>Please provide new password</p>
      {tokenError && (
        <S.GeneralError>
          It seems that token for password reset is not valid anymore.
        </S.GeneralError>
      )}
      <form onSubmit={handleSubmit}>
        <S.InputFields>
          <TextField
            label="Password"
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
            label="Retype password"
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
          SET NEW PASSWORD
        </Button>
      </form>
    </S.Wrapper>
  );
};
