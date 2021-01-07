import React from "react";
import { NextPage } from "next";

import { ThankYou } from "@components/organisms";
import { NotFound } from "@temp/components";
import { paths } from "@paths";
import { useAuth } from "@saleor/sdk";
import { IProps } from "./types";

const ThankYouPage: NextPage<IProps> = ({
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

export { ThankYouPage };
