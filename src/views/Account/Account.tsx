import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

// import { useAuth, useDefaultUserAddress, useUserDetails } from "@sdk/react";
import { useAuth, useUserDetails } from "@sdk/react";
import AddressBook from "../../account/AddressBook/AddressBook";

import {
  accountUrl,
  addressBookUrl,
  baseUrl,
  orderHistoryUrl,
  paymentOptionsUrl
} from "../../routes";

import AccountNavigation from "../../account/AccountNavigation";
import HelloPrompt from "../../account/HelloPrompts";
import { Loader } from "../../components";

const returnTab: any = (path: string, userDetails) => {
  let tabContent = <></>;
  switch (path) {
    case "/address-book/": {
      tabContent = <AddressBook user={userDetails} />;
    }
  }
  return tabContent;
};

const Account: React.FC<RouteComponentProps> = ({ history, match }) => {
  const { authenticated } = useAuth();
  const { data, loading } = useUserDetails();

  const links = [
    accountUrl,
    orderHistoryUrl,
    addressBookUrl,
    paymentOptionsUrl,
  ];

  if (!authenticated) {
    history.push(baseUrl);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <HelloPrompt name={data.firstName} />
      <AccountNavigation links={links} active={match.path} />
      {returnTab(match.path, data)}
    </div>
  );
};

export default withRouter(Account);
