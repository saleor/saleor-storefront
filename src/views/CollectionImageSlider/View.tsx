import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Page from "./Page";
import { TypedCollectionSlugQuery } from "./queries";
import './scss/index.scss'

type ViewProps = RouteComponentProps<{ id: string }>;

const View: React.FC<ViewProps> = ({ match }) => {

  const variables = {
    "id": match.params.id,
  };

  return (
    <div className="home-page slider-page">
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
