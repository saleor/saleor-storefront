import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Page from "./Page";
import { TypedCollectionSlugQuery } from "./queries";

type ViewProps = RouteComponentProps<{ id: string }>;

const View: React.FC<ViewProps> = ({ match }) => {

  const variables = {
    "id": match.params.id,
  };

  return (
    <div className="home-page">
      <TypedCollectionSlugQuery errorPolicy="all" variables={variables}>
        {({ data }) => {
          return (
            <div>
              <Page data={data} />
            </div>
          );
        }}
      </TypedCollectionSlugQuery>
    </div>
  )
};

export default View;
