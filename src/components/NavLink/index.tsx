import Link from "next/link";
import * as React from "react";
import { Url } from "url";

import { paths } from "@paths";

import {
  SecondaryMenu_menu_items,
  SecondaryMenu_menu_items_children,
} from "../Footer/gqlTypes/SecondaryMenu";
import { MainMenu_menu_items } from "../MainMenu/gqlTypes/MainMenu";
import { MainMenuSubItem } from "../MainMenu/gqlTypes/MainMenuSubItem";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item:
    | MainMenu_menu_items
    | MainMenuSubItem
    | SecondaryMenu_menu_items
    | SecondaryMenu_menu_items_children;
}
export const NavLink: React.FC<NavLinkProps> = ({ item, ...props }) => {
  const { name, url, category, collection, page } = item;
  const link = (url: Url) => (
    <Link passHref href={url}>
      <a {...props}>{name}</a>
    </Link>
  );

  if (url) {
    return (
      <a href={url} {...props}>
        {name}
      </a>
    );
  }
  if (category) {
    return link({
      pathname: paths.category,
      query: { slug: category.slug },
    });
  }
  if (collection) {
    return link({
      pathname: paths.collection,
      query: { slug: collection.slug },
    });
  }
  if (page) {
    return link({ pathname: paths.page, query: { slug: page.slug } });
  }

  return <span {...props}>{name}</span>;
};
