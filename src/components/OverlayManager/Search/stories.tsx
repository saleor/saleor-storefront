import { storiesOf } from "@storybook/react";
import React from "react";

import ProductItem from "./ProductItem";

storiesOf("components/OverlayManager/Search/ProductItem", module)
  .addParameters({ component: ProductItem })
  .add("default", () => (
    <ProductItem
      __typename="ProductCountableEdge"
      node={{
        __typename: "Product",
        thumbnail: null,
        thumbnail2x: null,
        id: "UHJvZHVjdDo3Mg==",
        name: "Product Name",
        slug: "product-name",
        category: {
          __typename: "Category",
          id: "categoryId",
          name: "Category Name",
        },
      }}
    />
  ))
  .add("without category", () => (
    <ProductItem
      __typename="ProductCountableEdge"
      node={{
        __typename: "Product",
        thumbnail: null,
        thumbnail2x: null,
        id: "UHJvZHVjdDo3Mg==",
        name: "Product Name",
        slug: "product-name2",
        category: null,
      }}
    />
  ));
