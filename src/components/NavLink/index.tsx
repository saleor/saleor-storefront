import * as React from "react";
import { Link } from "react-router-dom";

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from "../../core/utils";
import {
  SecondaryMenu_shop_navigation_secondary_items,
  SecondaryMenu_shop_navigation_secondary_items_children,
} from "../Footer/gqlTypes/SecondaryMenu";
import { MainMenu_shop_navigation_main_items } from "../MainMenu/gqlTypes/MainMenu";
import { MainMenuSubItem } from "../MainMenu/gqlTypes/MainMenuSubItem";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item:
    | MainMenu_shop_navigation_main_items
    | MainMenuSubItem
    | SecondaryMenu_shop_navigation_secondary_items
    | SecondaryMenu_shop_navigation_secondary_items_children;
}
export const NavLink: React.FC<NavLinkProps> = ({ item, ...props }) => {
  const { name, url, category, collection, page } = item;
  const link = (url: string) => (
    <Link to={url} {...props}>
      {name}
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
    return link(generateCategoryUrl(category.id, category.name));
  }
  if (collection) {
    return link(generateCollectionUrl(collection.id, collection.name));
  }
  if (page) {
    return link(generatePageUrl(page.slug));
  }

  return <span {...props}>{name}</span>;
};
