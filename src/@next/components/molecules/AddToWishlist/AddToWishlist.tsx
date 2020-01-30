import React from "react";

import { Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const AddToWishlist: React.FC<IProps> = ({
  added,
  onClick = () => null,
}: IProps) => {
  return (
    <S.Wrapper onClick={onClick}>
      <S.WishlistIcon>
        <Icon name="heart" size={18} />
      </S.WishlistIcon>
      Add to wishlist
    </S.Wrapper>
  );
};
