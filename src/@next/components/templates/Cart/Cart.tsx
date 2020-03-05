import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Cart with list of products added by user.
 */
export const Cart: React.FC<IProps> = ({
  items,
  updateItem,
  removeItem,
  loading,
  errors,
}: IProps) => {
  /**
   * TODO
   */
  return <S.Wrapper></S.Wrapper>;
};
