import * as React from "react";

import { Link } from "react-router-dom";
import { generateCategoryUrl } from "../../core/utils";
import { TopMenuSubItem } from "../TopNav/types/TopMenuSubItem";

interface TopNavNestedItemProps extends TopMenuSubItem {
  children?: TopNavNestedItemProps[];
}

const TopNavItem: React.SFC<TopNavNestedItemProps> = ({
  level,
  children,
  name,
  category,
  url
}) => {
  const href =
    (category ? generateCategoryUrl(category.id, category.name) : url) || "#";
  const content =
    children && children.length ? (
      <ul>
        {children.map((subItem, i) => (
          <TopNavItem key={i} {...subItem} />
        ))}
      </ul>
    ) : null;

  return (
    <li data-level={level}>
      {url ? <a href={href}>{name}</a> : <Link to={href}>{name}</Link>}
      {content}
    </li>
  );
};

export default TopNavItem;
