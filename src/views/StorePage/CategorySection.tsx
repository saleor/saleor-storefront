import React from "react";

import { MainProductList } from "@temp/components/MainProductList";
import { channelSlug } from "@temp/constants";
import { convertToAttributeScalar } from "@temp/core/utils";
import { IFilters } from "@types";

import { TypedCategoryProductsQuery } from "../Category/queries";
import { ListProductType } from "./Page";

type Props = {
  categoryInfo: {
    categoryId: string;
    categoryName: string;
  }[];
};
export const CategorySection: React.FC<Props> = ({ categoryInfo }) => {
  return (
    <>
      {categoryInfo.map(item => {
        const filters: IFilters = {
          pageSize: 8,
          attributes: {},
          priceGte: null,
          priceLte: null,
          sortBy: null,
        };

        const variables = {
          ...filters,
          attributes: filters.attributes
            ? convertToAttributeScalar(filters.attributes)
            : {},
          channel: channelSlug,
          id: item.categoryId,
          sortBy: null,
        };
        return (
          <>
            <TypedCategoryProductsQuery
              variables={variables}
              alwaysRender
              errorPolicy="all"
              loaderFull
            >
              {data => {
                const list: ListProductType[] =
                  data?.data?.products?.edges?.map(item => ({
                    id: item.node.id,
                    name: item.node.name,
                    imgUrl:
                      item.node?.thumbnail?.url ||
                      "https://thailamlandscape.vn/wp-content/uploads/2017/10/no-image.png",
                    tab: [item.node.category.name],
                  })) || [];
                return (
                  <MainProductList
                    key={item.categoryId}
                    title={item.categoryName}
                    listProduct={list}
                  />
                );
              }}
            </TypedCategoryProductsQuery>
          </>
        );
      })}
    </>
  );
};
