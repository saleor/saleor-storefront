import { NextPage } from "next";
import React from "react";

import Page from "./Page";

export type ViewProps = {
  query: { id: string };
};

const View: NextPage<ViewProps> = ({ query: { id } }) => {
  return <Page storeId={id} />;
};

export default View;
