import React from "react";

import { Wishlist } from "@components/templates";
import { WishlistContext } from "@sdk/react/components/WishlistProvider/context";

import { IProps } from "./types";

export const WishlistView: React.FC<IProps> = ({}: IProps) => {
  const { wishlist } = React.useContext(WishlistContext);

  return (
    <>
      <Wishlist wishlist={wishlist} />
    </>
  );
};
