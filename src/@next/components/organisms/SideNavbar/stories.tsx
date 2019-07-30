import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

// tslint:disable:object-literal-sort-keys
const items = [
  {
    id: "TWVudUl0ZW06Mjcx",
    name: "Accessories",
    category: {
      id: "Q2F0ZWdvcnk6Nw==",
      name: "Accessories",
      __typename: "Category",
    },
    url: null,
    collection: null,
    page: null,
    parent: null,
    __typename: "MenuItem",
    children: [
      {
        id: "123",
        name: "Subcategory I",
        category: {
          id: "Q2F0ZWdvcnk6Nw==",
          name: "Accessories",
          __typename: "Category",
        },
        url: null,
        collection: null,
        page: null,
        parent: null,
        __typename: "MenuItem",
        children: [
          {
            id: "TWVudUl0ZW01Mjcx",
            name: "Subsubcategory I",
            category: {
              id: "Q2F0ZWdvcnk6Nw==",
              name: "Accessories",
              __typename: "Category",
            },
          },
        ],
      },
      {
        id: "TWVudUl0ZW01Mjcx",
        name: "Subcategory II",
        category: {
          id: "Q2F0ZWdvcnk6Nw==",
          name: "Accessories",
          __typename: "Category",
        },
        url: null,
        collection: null,
        page: null,
        parent: null,
        __typename: "MenuItem",
        children: [],
      },
    ],
  },
  {
    id: "TWVudUl0ZW06Mjcy",
    name: "Groceries",
    category: {
      id: "Q2F0ZWdvcnk6OA==",
      name: "Groceries",
      __typename: "Category",
    },
    url: null,
    collection: null,
    page: null,
    parent: null,
    __typename: "MenuItem",
    children: [],
  },
  {
    id: "TWVudUl0ZW06Mjcz",
    name: "Apparel",
    category: {
      id: "Q2F0ZWdvcnk6OQ==",
      name: "Apparel",
      __typename: "Category",
    },
    url: null,
    collection: null,
    page: null,
    parent: null,
    __typename: "MenuItem",
    children: [],
  },
];

// TEMPORARY
export type items = typeof items;

import { SideNavbar } from ".";
storiesOf("@components/organisms/SideNavbar", module).add("default", () => (
  <BrowserRouter>
    <SideNavbar
      show={true}
      onHide={action("hide")}
      target={portalRoot}
      items={items}
    />
  </BrowserRouter>
));
