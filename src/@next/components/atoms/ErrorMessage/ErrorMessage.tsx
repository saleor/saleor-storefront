import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const ErrorMessage: React.FC<IProps> = ({ errors }: IProps) =>
  errors && errors.length ? (
    <S.ErrorMessage data-test="errorMessage">
      {errors.map((error, index) => (
        <S.ErrorParagraph key={index} data-test-id={index}>
          {error.message}
        </S.ErrorParagraph>
      ))}
    </S.ErrorMessage>
  ) : null;
