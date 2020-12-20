import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductListStories } from ".";
import { PRODUCTS } from "./fixtures";

storiesOf("@components/organisms/ProductListStories", module)
  .addParameters({ component: ProductListStories })
  .add("default", () => (
    <BrowserRouter>
      <ProductListStories
        products={PRODUCTS}
        canLoadMore
        loading={false}
        onLoadMore={() => null}
        testingContextId="testCategory"
      />
    </BrowserRouter>
  ));
