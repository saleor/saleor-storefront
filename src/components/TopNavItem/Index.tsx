import * as React from "react";

import { Link } from "react-router-dom";
import { generateCategoryUrl } from "../../core/utils";
import { TopMenuSubItem } from "../TopNav/types/TopMenuSubItem";
import { generateNavLink } from "../TopNavDropDown";

interface TopNavNestedItemProps extends TopMenuSubItem {
  children?: TopNavNestedItemProps[];
}

const TopNavItem: React.SFC<TopNavNestedItemProps> = ({
  children,
  name,
  category,
  collection,
  url,
  page
}) => {
  const content =
    children && children.length ? (
      <ul>
        {children.map((subItem, i) => (
          <TopNavItem key={i} {...subItem} />
        ))}
      </ul>
    ) : null;

  return (
    <li>
      {generateNavLink(name, url, category, collection, page)}
      {content}
    </li>
  );
};

export default TopNavItem;
