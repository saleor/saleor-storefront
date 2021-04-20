import { NextPage } from "next";
import React from "react";

import Page from "./Page";

export type ViewProps = {
  query: { id: string };
};

const View: NextPage<ViewProps> = ({ query: { id } }) => {
  console.log({ id });
  return (
    <div>
      <Page />
    </div>
  );
};

export default View;
