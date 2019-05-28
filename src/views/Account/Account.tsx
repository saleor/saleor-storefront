import * as React from "react";
import { RouteComponentProps } from "react-router";
import AccountNavigation from "../../account/AccountNavigation";
import HelloPrompt from "../../account/HelloPrompts";
import { Loader, NotFound } from "../../components";
import { UserContext } from "../../components/User/context";
import MyAccount from "../../account/MyAccount/MyAccount";

const returnTab: any = (path: string) => {
  let tabContent = <></>;
  switch (path) {
    case "/account/": {
      tabContent = <MyAccount />;
    }
  }
  return tabContent;
};

const Account: React.FC<RouteComponentProps> = ({ match }) => {
  const { user, loading } = React.useContext(UserContext);
  const links = ["account", "order-history", "address-book", "payment-options"];
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return (
      <div className="container">
        <HelloPrompt name={user.firstName} />
        <AccountNavigation
          links={links}
          active={match.path.replace(/\//g, "")}
        />
        {returnTab(match.path)}
      </div>
    );
  }
  return <NotFound />;
};

export default Account;
