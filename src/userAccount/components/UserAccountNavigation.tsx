import "./scss/navigation.scss";

import React from "react";
import TabTitle from "./TabTitle";

export interface IUserAccountNavigation {
  links: string[];
  active: string;
}

const UserAccountNavigation: React.FC<IUserAccountNavigation> = ({
  links,
  active
}) => {
  return (
    <div className="user-account-navigation">
      {links.map(element => (
          <TabTitle key={element} element={element} active={active} />
      ))}
    </div>
  );
};

export default UserAccountNavigation;
