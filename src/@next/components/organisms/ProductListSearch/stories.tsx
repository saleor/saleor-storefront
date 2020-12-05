import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductListSearch } from ".";
import { PRODUCTS } from "./fixtures";

storiesOf("@components/organisms/ProductListSearch", module)
  .addParameters({ component: ProductListSearch })
  .add("default", () => (
    <BrowserRouter>
      <ProductListSearch
        products={PRODUCTS}
        canLoadMore
        loading={false}
        onLoadMore={() => null}
        testingContextId="testCategory"
      />
    </BrowserRouter>
  ));
