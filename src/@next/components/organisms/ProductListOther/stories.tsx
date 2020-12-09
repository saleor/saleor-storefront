import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductListOther } from ".";
import { PRODUCTS } from "./fixtures";

storiesOf("@components/organisms/ProductListOther", module)
  .addParameters({ component: ProductListOther })
  .add("default", () => (
    <BrowserRouter>
      <ProductListOther
        products={PRODUCTS}
        canLoadMore
        loading={false}
        onLoadMore={() => null}
        testingContextId="testCategory"
      />
    </BrowserRouter>
  ));
