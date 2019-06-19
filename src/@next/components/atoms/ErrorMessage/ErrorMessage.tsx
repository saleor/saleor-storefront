import React from "react";

import * as S from "./styles";
import { IFormError, IProps } from "./types";

export const ErrorMessage: React.FC<IProps> = ({ errors }: IProps) =>
  !!(errors && errors.length) && (
    <S.ErrorMessage>
      {errors.map((error: IFormError) => error.message).join(" ")}
    </S.ErrorMessage>
  );
