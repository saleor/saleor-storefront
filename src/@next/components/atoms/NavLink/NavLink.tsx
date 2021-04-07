// TODO: Once used in @next - move utils to @utils
// Use slugs everywhere (they are used partially right now)

// NOTE: This component should only be used for navigation inside application
// For external urls, use different component

import Link from "next/link";
import React from "react";
import { generatePath } from "react-router";

import { paths } from "@paths";

import * as S from "./styles";
import { IProps } from "./types";

const getLinkUrl = ({ category, collection, page }: IProps["item"]) => {
  if (category) {
    return generatePath(paths.category, { slug: category.slug });
  }
  if (collection) {
    return generatePath(paths.collection, { slug: collection.slug });
  }
  if (page) {
    return generatePath(paths.page, { slug: page.slug });
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
    <Link href={linkUrl}>
      <S.Link activeClassName="navlink-active" fullWidth={fullWidth} {...props}>
        {name}
      </S.Link>
    </Link>
  ) : null;
};
