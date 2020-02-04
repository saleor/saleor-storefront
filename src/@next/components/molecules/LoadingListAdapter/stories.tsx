import { storiesOf } from "@storybook/react";
import React from "react";

import { LoadingListAdapter } from ".";
import { ProductList } from "../../organisms";
import { PRODUCTS } from "../../organisms/ProductList/fixtures";

storiesOf("@components/molecules/LoadingListAdapter", module).add(
  "default",
  () => (
    <LoadingListAdapter
      loading={false}
      canLoadMore={true}
      onLoadMore={() => null}
      loadMoreText="Load more products"
    >
      <ProductList products={PRODUCTS} totalCount={PRODUCTS.length} />
    </LoadingListAdapter>
  )
);
