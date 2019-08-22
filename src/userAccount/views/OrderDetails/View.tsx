import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { useOrderDetailsById } from "@sdk/react";

import { Authenticated } from "../../components";
import Page from "./Page";
import { TypedOrderDetailsByTokenQuery } from "./queries";

const View: React.FC<RouteComponentProps<{ id?: string; token?: string }>> = ({
  match: {
    params: { id, token },
  },
}) => {
  const guest = !id;

  const { data: order } = useOrderDetailsById({ id }, { skip: !guest });

  return (
    <div className="order-details container">
      {guest ? (
        <TypedOrderDetailsByTokenQuery variables={{ token }}>
          {({ data: { orderByToken } }) => <Page guest order={orderByToken} />}
        </TypedOrderDetailsByTokenQuery>
      ) : (
        <Authenticated>
          <Page guest={false} order={order} />
        </Authenticated>
      )}
    </div>
  );
};

export default View;
