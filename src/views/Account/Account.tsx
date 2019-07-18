import * as React from "react";
import { RouteComponentProps } from "react-router";

import { useAuth, useUserDetails } from "@sdk/react";

import {
  accountUrl,
  addressBookUrl,
  orderHistoryUrl,
  paymentOptionsUrl
} from "../../routes";

import AccountNavigation from "../../account/AccountNavigation";
import HelloPrompt from "../../account/HelloPrompts";
import { Loader, NotFound } from "../../components";

const Account: React.FC<RouteComponentProps> = ({ match }) => {
  const { authenticated } = useAuth();
  const { data, loading } = useUserDetails();

  const links = [
    accountUrl,
    orderHistoryUrl,
    addressBookUrl,
    paymentOptionsUrl,
  ];

  if (!authenticated) {
    return <NotFound />;
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <HelloPrompt name={data.firstName} />
      <AccountNavigation links={links} active={match.path} />
    </div>
  );
};

export default Account;
