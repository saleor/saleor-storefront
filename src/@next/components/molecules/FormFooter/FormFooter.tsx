import React from "react";

import { Button, ButtonLink } from "@components/atoms";
import * as S from "./styles";
import { IProps } from "./types";

export const FormFooter: React.FC<IProps> = ({
  cancelBtn,
  formId,
  submitBtn,
}: IProps) => {
  return <S.Footer></S.Footer>;
};
