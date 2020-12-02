import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { ThankYou } from "@components/organisms";
import { NotFound } from "@temp/components";
import { paths } from "@paths";
import { useAuth } from "@saleor/sdk";
import { IProps } from "./types";

const ThankYouPage: NextPage<IProps> = ({
  query: { orderNumber, token, orderStatus },
}) => {
  const { push } = useRouter();
  const { user } = useAuth();

  return token && orderNumber && orderStatus ? (
    <ThankYou
      continueShopping={() => push(paths.home)}
      orderNumber={orderNumber}
      orderDetails={() =>
        push({
          pathname: user ? paths.accountOrderDetail : paths.guestOrderDetail,
          query: { token },
        })
      }
      orderStatus={orderStatus}
    />
  ) : (
    <NotFound />
  );
};

export { ThankYouPage };
