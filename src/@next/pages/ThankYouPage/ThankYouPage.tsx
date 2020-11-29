import React from "react";

import { ThankYou } from "@components/organisms";
import { BASE_URL } from "@temp/core/config";
import { NextPage } from "next";

import { useRouter } from "next/router";
import { orderHistoryUrl } from "@temp/app/routes";
import { NotFound } from "@temp/components";
import { IProps } from "./types";

const ThankYouPage: NextPage<IProps> = ({ query: { orderNumber, token } }) => {
  const { push } = useRouter();

  return token && orderNumber ? (
    <ThankYou
      continueShopping={() => push(BASE_URL)}
      orderNumber={orderNumber}
      orderDetails={() => push({ pathname: orderHistoryUrl, query: { token } })}
    />
  ) : (
    <NotFound />
  );
};

export { ThankYouPage };
