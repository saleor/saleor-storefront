import { useAuth } from "@saleor/sdk";
import { NextPage } from "next";
import React from "react";
import { generatePath } from "react-router";

import { ThankYou } from "@components/organisms";
import { paths } from "@paths";
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
      orderDetailsUrl={generatePath(
        user ? paths.accountOrderDetail : paths.guestOrderDetail,
        { token }
      )}
      orderStatus={orderStatus}
    />
  ) : (
    <NotFound />
  );
};
