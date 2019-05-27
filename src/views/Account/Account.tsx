import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";
import AccountNavigation from "../../account/AccountNavigation";
import HelloPrompt from "../../account/HelloPrompts";
import { NotFound } from "../../components";
import { UserContext } from "../../components/User/context";

const Account: React.FC<RouteComponentProps> = ({ match }) => {
  const user = React.useContext(UserContext);
  const links = ["account", "order-history", "address-book", "payment-options"];
  return user.user ? (
    <div className="account-container">
      <HelloPrompt name={user.user.firstName} />
      <AccountNavigation links={links} active={match.path.replace(/\//g, "")} />
    </div>
  ) : (
    <NotFound />
  );
};

export default Account;
