import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const InputLabel: React.FC<IProps> = ({
  children,
  active,
  labelBackground,
}: IProps) => {
  return <S.Label {...{ active, labelBackground }}>{children}</S.Label>;
};
