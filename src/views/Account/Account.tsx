import * as React from "react";
import { RouteComponentProps } from "react-router";

import { useUserDetails } from "@sdk/react";

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
  const { data, loading } = useUserDetails();

  const links = [
    accountUrl,
    orderHistoryUrl,
    addressBookUrl,
    paymentOptionsUrl,
  ];
  if (loading) {
    return <Loader />;
  }
  if (data) {
    return (
      <div className="container">
        <HelloPrompt name={data.firstName} />
        <AccountNavigation links={links} active={match.path} />
      </div>
    );
  }
  return <NotFound />;
};

export default Account;
