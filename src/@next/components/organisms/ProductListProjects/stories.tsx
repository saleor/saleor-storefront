import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductListProjects } from ".";
import { PRODUCTS } from "./fixtures";

storiesOf("@components/organisms/ProductListProjects", module)
  .addParameters({ component: ProductListProjects })
  .add("default", () => (
    <BrowserRouter>
      <ProductListProjects
        products={PRODUCTS}
        canLoadMore
        loading={false}
        onLoadMore={() => null}
        testingContextId="testCategory"
      />
    </BrowserRouter>
  ));
