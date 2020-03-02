import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Example component description.
 */
export const Title: React.FC<IProps> = ({ children = "" }: IProps) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};
