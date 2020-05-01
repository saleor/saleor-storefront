import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { getCollectionFromSlug } from '../../core/utils';
import Page from "./Page";
import { TypedCollectionSlugQuery } from "./queries";

type ViewProps = RouteComponentProps<{ slug: string }>;

const View: React.FC<ViewProps> = ({ match }) => {
  const variables = {
    slug: getCollectionFromSlug(match.params.slug, "Collection"),
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
