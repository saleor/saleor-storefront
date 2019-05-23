import "./scss/index.scss";

import * as React from "react";

import HelloPrompt from "../../userAccount/components/HelloPrompt";
import UserAccountNavigation from "../../userAccount/components/UserAccountNavigation";

import { RouteComponentProps } from "react-router";
import { UserContext } from "../../components/User/context";
import { NotFound } from "../../components";

const returnTab: any = (path: string) => {
  let tabContent = <></>;
  switch(path) {
    case "/my-account/": {
      tabContent = <></>
    }
  }
  return tabContent; 
}


const UserAccountContainer: React.FC<RouteComponentProps> = ({ match }) => {
  const links = ["my-account", "order-history", "address-book", "payment-options"]
  const user = React.useContext(UserContext);
  return user.user ? (
    
      <div className="user-account-container">
        <HelloPrompt name={user.user.firstName} />
        <UserAccountNavigation links={links} active={match.path.replace(/\//g, "")}/>
        {returnTab(match.path)}
      </div>
  ) : <NotFound />;
};

export default UserAccountContainer;
