import React from "react";
import { NextPage } from "next";

import { ThankYou } from "@components/organisms";
import { paths } from "@paths";
import { useAuth } from "@saleor/sdk";

import NotFound from "@temp/components/NotFound";
import { IProps } from "./types";

export const ThankYouPage: NextPage<IProps> = ({
  query: { orderNumber, token, orderStatus },
}) => {
  const { user } = useAuth();

  return token && orderNumber && orderStatus ? (
    <ThankYou
      continueShoppingUrl={paths.home}
      orderNumber={orderNumber}
      orderDetailsUrl={{
        pathname: user ? paths.accountOrderDetail : paths.guestOrderDetail,
        query: { token },
      }}
      orderStatus={orderStatus}
    />
  ) : (
    <NotFound />
  );
};
