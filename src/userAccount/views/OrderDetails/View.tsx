import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { Loader } from "@components/atoms";
import { useOrderDetails, useUserDetails } from "@saleor/sdk";

import Page from "./Page";

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  match: {
    params: { token },
  },
}) => {
  const { data: order, loading } = useOrderDetails({ token });
  const { data: user } = useUserDetails();
  const guest = !user;

  const handleDownloadInvoice = () => {
    if (order && "invoices" in order && order.invoices?.length > 0) {
      // Always download latest invoice
      const invoice = order.invoices.reduce((a, b) => {
        return new Date(a.createdAt) > new Date(b.createdAt) ? a : b;
      });

      if (invoice) {
        window.open(invoice.url, "_blank");
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="order-details container">
      <Page
        guest={guest}
        order={order}
        downloadInvoice={handleDownloadInvoice}
      />
    </div>
  );
};

export default View;
