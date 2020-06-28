// TODO: Once used in @next - move utils to @utils
// Use slugs everywhere (they are used partially right now)

// NOTE: This component should only be used for navigation inside application
// For external urls, use different component

import React from "react";

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from "@utils/core";
import * as S from "./styles";
import { IProps } from "./types";

const getLinkUrl = ({ category, collection, page }: IProps["item"]) => {
  if (category) {
    return generateCategoryUrl(category.id, category.name);
  }
  if (collection) {
    return generateCollectionUrl(collection.id, collection.name);
  }
  if (page) {
    return generatePageUrl(page.slug);
  }
};

export const NavLink: React.FC<IProps> = ({
  item,
  fullWidth = false,
  ...props
}) => {
  const { name, url, category, collection, page } = item;

  if (url) {
    return (
      <a href={url} {...props}>
        {name}
      </a>
    );
  }

  const linkUrl = getLinkUrl({ category, collection, page });

  return linkUrl ? (
    <S.Link
      to={linkUrl}
      activeClassName="navlink-active"
      fullWidth={fullWidth}
      {...props}
    >
      {name}
    </S.Link>
  ) : null;
};
