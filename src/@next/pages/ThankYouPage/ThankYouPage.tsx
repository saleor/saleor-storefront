import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { baseUrl } from "../../../app/routes/paths";

import { NotFound } from "../../../components";

import { IProps } from "./types";
import { ThankYou } from "../../components/organisms";

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
      orderDetails={() => {}}
    />
  );
};

export { ThankYouPage };
