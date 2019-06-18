import React from "react";

import * as S from "./styles";
import { IProps, Style } from "./types";

export const TextField: React.FC<IProps> = ({
  label = "",
  iconLeft,
  iconRight,
  errors,
  helpText,
  styleType = "white" as Style,
  ...rest
}: IProps) => {
  const hasErrors = !!(errors && errors.length);

  return (
    <S.Input>
      {iconLeft && <S.Icon position="left">{iconLeft}</S.Icon>}
      {iconRight && <S.Icon position="right">{iconRight}</S.Icon>}
      <S.InputContent>
        <S.InputField
          error={hasErrors}
          hasLeftIcon={!!iconLeft}
          styleType={styleType}
          pattern=".*\S.*"
          {...rest}
        />
        {label && <S.Label error={hasErrors}>{label}</S.Label>}
      </S.InputContent>
      {errors && (
        <S.ErrorMessage>
          {errors.map(error => error.message).join(" ")}
        </S.ErrorMessage>
      )}
      {helpText && <S.HelpText>{helpText}</S.HelpText>}
    </S.Input>
  );
};
