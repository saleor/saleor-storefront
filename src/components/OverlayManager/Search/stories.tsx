import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router";

import ProductItem from "./ProductItem";

storiesOf("components/OverlayManager/Search/ProductItem", module)
  .addParameters({ component: ProductItem })
  .add("default", () => (
    <MemoryRouter>
      <ProductItem
        __typename="ProductCountableEdge"
        node={{
          __typename: "Product",
          thumbnail: null,
          thumbnail2x: null,
          id: "UHJvZHVjdDo3Mg==",
          name: "Product Name",
          category: {
            __typename: "Category",
            id: "categoryId",
            name: "Category Name",
          },
        }}
      />
    </MemoryRouter>
  ))
  .add("without category", () => (
    <MemoryRouter>
      <ProductItem
        __typename="ProductCountableEdge"
        node={{
          __typename: "Product",
          thumbnail: null,
          thumbnail2x: null,
          id: "UHJvZHVjdDo3Mg==",
          name: "Product Name",
          category: null,
        }}
      />
    </MemoryRouter>
  ));
