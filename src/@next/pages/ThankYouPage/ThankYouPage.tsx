import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { ThankYou } from "@components/organisms";
import { BASE_URL } from "@temp/core/config";
import { generateGuestOrderDetailsUrl } from "@utils/core";
import { NextPage } from "next";

const ThankYouPage: NextPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { token, orderNumber } = location.state;
  return (
    <ThankYou
      continueShopping={() => history.push(BASE_URL)}
      orderNumber={orderNumber}
      orderDetails={() => history.push(generateGuestOrderDetailsUrl(token))}
    />
  );
};

export { ThankYouPage };
