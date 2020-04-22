import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { ThankYou } from "@components/organisms";

import { baseUrl } from "../../../app/routes/paths";

import { NotFound } from "../../../components";

import { IProps } from "./types";

const ThankYouPage: React.FC<IProps> = ({}: IProps) => {
  const location = useLocation();
  const history = useHistory();
  const { token, id, orderNumber } = location.state;
  if (!token || !id) {
    return <NotFound />;
  }
  return (
    <ThankYou
      continueShopping={() => history.push(baseUrl)}
      orderNumber={orderNumber}
      orderDetails={() => null}
    />
  );
};

export { ThankYouPage };
