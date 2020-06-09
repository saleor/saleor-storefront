import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const ButtonLink: React.FC<IProps> = ({
  children,
  color = "base",
  testingContext,
  testingContextId,
  size = "md",
  ...props
}: IProps) => {
  return (
    <S.ButtonLink
      data-test={testingContext}
      data-test-id={testingContextId}
      color={color}
      size={size}
      {...props}
    >
      {children}
    </S.ButtonLink>
  );
};
