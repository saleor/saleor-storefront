import React from "react";

import { MainProductList } from "@temp/components/MainProductList";
import NavigationBar from "@temp/components/NavigationBar";

import FollowButton from "../../components/FollowButton";
import GalleryCarousel from "../Product/GalleryCarousel";
import { TypedProductListQuery } from "./queries";

type Props = {
  storeId: string;
};

export type ListProductType = {
  id: string;
  name: string;
  imgUrl: string;
  tab: string[];
};
const Page: React.FC<Props> = ({ storeId }) => {
  const ListNav = [
    {
      title: "Home",
    },
    {
      title: "Products",
      category: [
        {
          title: "category 11111 111111 111111",
          category: [
            {
              title: "category ",
            },
            {
              title: "category 1",
            },
            {
              title: "category 1",
            },
          ],
        },
        {
          title: "category 1",
        },
        {
          title: "category 1",
        },
        {
          title: "category 1",
          category: [
            {
              title: "category ",
            },
            {
              title: "category 1",
            },
            {
              title: "category 1",
            },
          ],
        },
        {
          title: "category 1",
        },
        {
          title: "category 1",
        },
      ],
    },
    {
      title: "Profile",
      category: [
        {
          title: "category 1",
        },
        {
          title: "category 1",
        },
        {
          title: "category 1",
        },
        {
          title: "category 1",
        },
        {
          title: "category 1",
        },
        {
          title: "category 1",
        },
      ],
    },
    {
      title: "Contacts",
    },
    {
      title: "Video",
    },
    {
      title: "Promotion",
    },
    {
      title: "Feeds",
    },
  ];

  const images: {
    __typename: "ProductImage";
    id: string;
    alt: string;
    url: string;
  }[] = [
    {
      __typename: "ProductImage",
      id: "1",
      alt: "",
      url:
        "https://icdn.dantri.com.vn/thumb_w/640/2019/08/06/cam-1565062520965.jpg",
    },
    {
      __typename: "ProductImage",
      id: "2",
      alt: "",
      url:
        "https://icdn.dantri.com.vn/thumb_w/640/2019/08/06/cam-1565062520965.jpg",
    },
    {
      __typename: "ProductImage",
      id: "3",
      alt: "",
      url:
        "https://icdn.dantri.com.vn/thumb_w/640/2019/08/06/cam-1565062520965.jpg",
    },
  ];

  const [stt, setStt] = React.useState(false);
  return (
    <>
      <TypedProductListQuery
        alwaysRender
        displayLoader={false}
        errorPolicy="all"
        variables={{ first: 8 }}
      >
        {({ data }) => {
          const listMainProduct: ListProductType[] =
            data?.products?.edges?.map(item => ({
              id: item.node.id,
              imgUrl:
                item.node?.thumbnail?.url ||
                "https://thailamlandscape.vn/wp-content/uploads/2017/10/no-image.png",
              name: item.node.name,
              tab: [item.node.productType.name],
            })) || [];
          return (
            <>
              <NavigationBar listNav={ListNav} />
              <GalleryCarousel images={images} isSlide />
              <FollowButton isActive={stt} setStt={setStt} storeId={storeId} />
              <MainProductList
                title="Main Product"
                listProduct={listMainProduct}
              />
            </>
          );
        }}
      </TypedProductListQuery>
      <TypedProductListQuery
        alwaysRender
        displayLoader={false}
        errorPolicy="all"
        variables={{ last: 8 }}
      >
        {({ data }) => {
          const listMainProduct: ListProductType[] =
            data?.products?.edges?.map(item => ({
              id: item.node.id,
              imgUrl:
                item.node?.thumbnail?.url ||
                "https://thailamlandscape.vn/wp-content/uploads/2017/10/no-image.png",
              name: item.node.name,
              tab: [item.node.productType.name],
            })) || [];
          return (
            <>
              <MainProductList title="Tile" listProduct={listMainProduct} />
            </>
          );
        }}
      </TypedProductListQuery>
    </>
  );
};

export default Page;
