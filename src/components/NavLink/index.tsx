import Link from "next/link";
import * as React from "react";
import { generatePath } from "react-router";

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
  const link = (url: string) => (
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
    return link(generatePath(paths.category, { slug: category.slug }));
  }
  if (collection) {
    return link(generatePath(paths.collection, { slug: collection.slug }));
  }
  if (page) {
    return link(generatePath(paths.page, { slug: page.slug }));
  }

  return <span {...props}>{name}</span>;
};
