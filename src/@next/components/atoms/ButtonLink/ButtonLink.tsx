import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const ButtonLink: React.FC<IProps> = ({
  color = "base",
  size = "md",
  text,
  ...props
}: IProps) => {
  return (
    <S.ButtonLink color={color} size={size} {...props}>
      {text}
    </S.ButtonLink>
  );
};
