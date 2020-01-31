import React, { useEffect, useState } from "react";

import { Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const AddToWishlistButton: React.FC<IProps> = ({
  added,
  onClick = () => null,
}: IProps) => {
  const [iconName, setIconName] = useState<"heart" | "heart_filled">(
    added ? "heart_filled" : "heart"
  );
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (added || hover) {
      setIconName("heart_filled");
    } else {
      setIconName("heart");
    }
  }, [added, hover]);

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
      <S.WishlistIcon>
        <Icon name={iconName} size={iconName === "heart" ? 38 : 28} />
      </S.WishlistIcon>
      Add to wishlist
    </S.Wrapper>
  );
};
