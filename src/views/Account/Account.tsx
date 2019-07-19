import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { useAuth, useUserDetails } from "@sdk/react";

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
    </div>
  );
};

export default withRouter(Account);
