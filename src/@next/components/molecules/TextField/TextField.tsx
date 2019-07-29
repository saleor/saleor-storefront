import React, { useState } from "react";

import * as S from "./styles";
import { IProps } from "./types";

import { ErrorMessage, Input } from "@components/atoms";

export const TextField: React.FC<IProps> = ({
  errors,
  helpText,
  required,
  onBlur,
  value,
  ...rest
}: IProps) => {
  const [touched, setTouched] = useState(false);
  const setTouchedOnBlur = (e: React.FocusEvent<any>) => {
    setTouched(true);
    if (!!onBlur) {
      onBlur(e);
    }
  };
  if (required && touched && !value) {
    const errorMessage = [{ message: "Required field!" }];
    errors =
      errors && errors.length ? errors.concat(errorMessage) : errorMessage;
  }

  const hasErrors = !!(errors && errors.length);

  return (
    <S.TextField>
      <Input
        {...rest}
        value={value}
        error={hasErrors}
        onBlur={setTouchedOnBlur}
      />
      <ErrorMessage errors={errors} />
      {helpText && <S.HelpText>{helpText}</S.HelpText>}
    </S.TextField>
  );
};
