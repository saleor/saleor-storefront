import "./scss/index.scss";

import * as React from "react";

import Authenticated from "../../userAccount/components/Authenticated";
import HelloPrompt from "../../userAccount/components/HelloPrompt";
import UserAccountNavigation from "../../userAccount/components/UserAccountNavigation";

import { RouteComponentProps } from "react-router";

const returnTab: any = (path: string) => {
  let tabContent = <></>;
  switch(path) {
    case "/my-account/": {
      tabContent = <div>myaccount</div>
    }
  }
  return tabContent; 
}


const UserAccountContainer: React.FC<RouteComponentProps> = ({ match }) => {
  const links = ["my-account", "order-history", "address-book", "payment-options"]
  return (
    <Authenticated>
      <div className="user-account-container">
        <HelloPrompt name="Matt" />
        <UserAccountNavigation links={links}/>
        {returnTab(match.path)}
      </div>
    </Authenticated>
  );
};

export default UserAccountContainer;
