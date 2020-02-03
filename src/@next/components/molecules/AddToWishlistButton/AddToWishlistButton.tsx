import React, { useState } from "react";

import { Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const AddToWishlistButton: React.FC<IProps> = ({
  added,
  onClick = () => null,
}: IProps) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <S.Wrapper
      added={added}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* S.WishlistIcon component is reapeted for two icons - it should to prevent flashing css */}
      {added || hover ? (
        <S.WishlistIcon>
          <Icon name="heart_filled" size={28} />
        </S.WishlistIcon>
      ) : (
        <S.WishlistIcon>
          <Icon name="heart" size={38} />
        </S.WishlistIcon>
      )}
      {added ? `Remove from wishlist` : `Add to wishlist`}
    </S.Wrapper>
  );
};
