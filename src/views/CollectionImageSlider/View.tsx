import * as React from "react";
// import { RouteComponentProps } from "react-router-dom";
import { getCollectionFromSlug } from '../../core/utils';
import Page from "./Page";
import { TypedCollectionSlugQuery } from "./queries";

// type ViewProps = RouteComponentProps<{ slug: string }>;

export const View= ({
  match: {
    params: { slug },
  },
}) => {
  console.log("match.params.slug", slug);
  const variables = {
    slug: getCollectionFromSlug(slug, "Collection"),
  };

  return (
    <div className="home-page">
      <TypedCollectionSlugQuery errorPolicy="all" variables={variables}>
        {({ data }) => {
          console.log("data", data);
          return (
            <div>
              <Page data={data} />
              Hello
            </div>

          );
        }}
      </TypedCollectionSlugQuery>
    </div>
  )
};

export default View