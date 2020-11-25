import React from "react";
import { useIntl } from "react-intl";
import Media from "react-responsive";
import { commonMessages } from "@temp/intl";
import { useAuth } from "@saleor/sdk";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { smallScreen } from "@styles/constants";
import { AccountMenu, AccountMenuMobile } from "@components/molecules";
import { AccountTab, OrdersHistory } from "@pages";
import AddressBook from "../../account/AddressBook/AddressBook";
import {
  accountUrl,
  addressBookUrl,
  baseUrl,
  orderHistoryUrl,
} from "../../app/routes";
import { Breadcrumbs, Loader } from "../../components";

import "./scss/index.scss";
import { Redirect } from "@components/atoms";

const returnTab: any = (path: string, userDetails) => {
  let tabContent = <></>;
  switch (path) {
    case accountUrl: {
      tabContent = <AccountTab />;
      break;
    }
    case addressBookUrl: {
      tabContent = <AddressBook user={userDetails} />;
      break;
    }
    case orderHistoryUrl: {
      tabContent = <OrdersHistory />;
      break;
    }
    default:
      tabContent = <AccountTab />;
      break;
  }
  return tabContent;
};

const Account: NextPage = () => {
  const intl = useIntl();
  const { user, loaded } = useAuth();
  const { asPath, pathname } = useRouter();
  const links = [accountUrl, orderHistoryUrl, addressBookUrl];

  if (!user) {
    return <Redirect url={baseUrl} />;
  }
  return loaded ? (
    <div className="container">
      <Breadcrumbs
        breadcrumbs={[
          {
            link: asPath,
            value: intl.formatMessage(commonMessages.myAccount),
          },
        ]}
      />
      <div className="account">
        <Media minWidth={smallScreen}>
          <div className="account__menu">
            <AccountMenu links={links} active={pathname} />
          </div>
        </Media>
        <Media maxWidth={smallScreen - 1}>
          <div className="account__menu_mobile">
            <AccountMenuMobile links={links} active={pathname} />
          </div>
        </Media>
        <div className="account__content">
          {user && returnTab(pathname, user)}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Account;
