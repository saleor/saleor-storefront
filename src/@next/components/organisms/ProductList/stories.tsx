import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductList } from ".";
import { PRODUCTS } from "./fixtures";

storiesOf("@components/organisms/ProductList", module)
  .addParameters({ component: ProductList })
  .add("default", () => (
    <BrowserRouter>
      <ProductList
        products={PRODUCTS}
        canLoadMore={true}
        loading={false}
        onLoadMore={() => null}
      />
    </BrowserRouter>
  ));
