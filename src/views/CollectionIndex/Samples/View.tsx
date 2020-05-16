import * as React from "react";
import { CartContext } from "../../../components/CartProvider/context";
import { RouteComponentProps } from "react-router-dom";
import { TypedCollectionSampleQuery } from "./queries";
import { SAMPLES_PER_PAGE } from "../../../core/config";
import Page from "./Page";

type ViewProps = RouteComponentProps<{ id: string }>;

const STATIC_CAT_SAMPLE_ID = "Q2F0ZWdvcnk6MjM=";

const View: React.FC<ViewProps> = ({ match, history }) => {
  const variables = {
    catId: STATIC_CAT_SAMPLE_ID,
    id: match.params.id,
    pageSize: SAMPLES_PER_PAGE,
  };

  return (
    <div className="home-page">
      <TypedCollectionSampleQuery errorPolicy="all" variables={variables}>
        {({ data, refetch }) => {
          return (
            <CartContext.Consumer>
              {cart => (
                <Page
                  data={data}
                  cart={cart}
                  history={history}
                  collectionId={match.params.id}
                />
              )}
            </CartContext.Consumer>
          );
        }}
      </TypedCollectionSampleQuery>
    </div>
  );
};

export default View;
