import React from "react";

import { MainProductList } from "@temp/components/MainProductList";
import NavigationBar from "@temp/components/NavigationBar";

interface IProps {}
function Page(props: IProps) {
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

  const ListProduct = [
    {
      id: 1,
      imgUrl:
        "https://icdn.dantri.com.vn/thumb_w/640/2019/08/06/cam-1565062520965.jpg",
      name: "name 1",
      tab: ["tab1", "tab2"],
    },
    {
      id: 2,
      imgUrl:
        "https://icdn.dantri.com.vn/thumb_w/640/2019/08/06/cam-1565062520965.jpg",
      name: "name 1",
      tab: ["tab1", "tab2"],
    },
    {
      id: 3,
      imgUrl:
        "https://icdn.dantri.com.vn/thumb_w/640/2019/08/06/cam-1565062520965.jpg",
      name: "name 1",
      tab: ["tab1", "tab2"],
    },
    {
      id: 4,
      imgUrl:
        "https://cdn.tgdd.vn/2020/08/CookProductThumb/Untitled-2-620x620-119.jpg",
      name: "name 1",
      tab: ["tab1", "tab2"],
    },
    {
      id: 5,
      imgUrl:
        "https://icdn.dantri.com.vn/thumb_w/640/2019/08/06/cam-1565062520965.jpg",
      name: "name 1",
      tab: ["tab1", "tab2"],
    },
  ];
  return (
    <div>
      <NavigationBar listNav={ListNav} />

      {/* carousel */}
      {/*  */}
      {/* MainProductList */}
      <MainProductList listProduct={ListProduct} />
      {/*  */}
    </div>
  );
}

export default Page;
