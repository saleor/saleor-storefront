import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Example component description.
 */
const Checkout: React.FC<IProps> = ({
  navigation,
  checkout,
  cartSummary,
  button,
}: IProps) => {
  return <S.Wrapper></S.Wrapper>;
};

export { Checkout };
