import { useAuth, useOrderDetails } from "@saleor/sdk";
import { NextPage } from "next";
import * as React from "react";

import { Loader } from "@components/atoms";

import Page from "./Page";
import { IProps } from "./types";

import "./scss/index.scss";

const View: NextPage<IProps> = ({ query: { token } }) => {
  const { data: order, loading } = useOrderDetails(
    { token },
    { fetchPolicy: "cache-first" }
  );
  const { user } = useAuth();
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

  return loading ? (
    <Loader />
  ) : (
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
