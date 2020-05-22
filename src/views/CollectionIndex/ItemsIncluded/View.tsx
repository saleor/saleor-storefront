import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { TypedCabinetCollectionProdductsQuery } from "./query";
import { CartContext } from "../../../components/CartProvider/context";
import Page from "./Page";

type ViewProps = RouteComponentProps<{ id: string }>;

const View: React.FC<ViewProps> = ({ match, history }) => {
  return (
    <TypedCabinetCollectionProdductsQuery
      variables={{
        collectionId: [match.params.id],
      }}
    >
      {({ data, error }) => {
        if (error) {
          console.warn("Error >> ", error);
          return null;
        }
        return (
          <CartContext.Consumer>
            {cart => (
              <div className="home-page">
                <Page
                  products={data.products.edges}
                  cart={cart}
                  history={history}
                />
              </div>
            )}
          </CartContext.Consumer>
        );
      }}
    </TypedCabinetCollectionProdductsQuery>
  );
};

export default View;
