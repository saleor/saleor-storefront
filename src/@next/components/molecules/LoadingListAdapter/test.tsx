import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { LoadingListAdapter } from ".";
import { ProductList } from "../../organisms";
import { PRODUCTS } from "../../organisms/ProductList/fixtures";

describe("<LoadingListAdapter />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <LoadingListAdapter
        loading={false}
        canLoadMore={true}
        onLoadMore={() => null}
        loadMoreText="Load more products"
      >
        <ProductList products={PRODUCTS} totalCount={PRODUCTS.length} />
      </LoadingListAdapter>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
