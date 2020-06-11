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
      <h3>Resetuj swoje hasło</h3>

      <p>Podaj nowe hasło</p>
      {tokenError && (
        <S.GeneralError>
          Wygląda na to, że token do resetowania hasła nie jest już poprawny.
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

        <Button dataCy="submitNewPasswordFormButton" type="submit" fullWidth={true}>
          USTAW NOWE HASŁO
        </Button>
      </form>
    </S.Wrapper>
  );
};
