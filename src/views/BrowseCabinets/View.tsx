import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Page from "./Page";
import { TypedCollectionQuery } from "./queries";

type ViewProps = RouteComponentProps<{ slug: string }>;

export const View: React.FC<ViewProps> = ({
  match: {
    params: { slug },
  },
  history,
}) => (
  <div className="home-page">
    <TypedCollectionQuery errorPolicy="all">
      {({ data }) => {
        return (
            <Page data={data} history={history}/>
        );
      }}
    </TypedCollectionQuery>
  </div>
);

export default View;
