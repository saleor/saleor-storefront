import "jest-styled-components";

import { OrdersByUser_me_orders_edges_node } from "@saleor/sdk/lib/queries/gqlTypes/OrdersByUser";
import { mount, shallow } from "enzyme";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import React from "react";
import { IntlProvider } from "react-intl";
import { generatePath } from "react-router";

import { paths } from "@paths";
import { UknownObject } from "@utils/tsUtils";

import { Thumbnail } from "..";
import { OrderTable } from ".";
import * as S from "./styles";

const ORDERS = [
  {
    created: "2019-09-04T10:50:03.994164+00:00",
    id: "T3JkZXI6Nzc=",
    lines: [
      {
        id: "T3JkZXJMaW5lOjE3Nw==",
        thumbnail: {
          alt: "",
          url: "https://dummyimage.com/600x400/000/fff",
        },
        thumbnail2x: {
          url: "https://dummyimage.com/600x400/000/fff",
        },
        variant: {
          id: "UHJvZHVjdFZhcmlhbnQ6MjAz",
          product: {
            id: "UHJvZHVjdDo3Mg==",
            name: "Apple Juice",
            slug: "apple-juice",
          },
        },
      },
    ],
    number: "77",
    statusDisplay: "Unfulfilled",
    token: "687f3e43-b198-4c7f-b6e5-75c2c93b3f45",
    total: {
      gross: { amount: 42.91, currency: "USD" },
      net: { amount: 42.91, currency: "USD" },
    },
  },
  {
    created: "2019-06-10T12:29:54.886836+00:00",
    id: "T3JkZXI6NzY=",
    lines: [
      {
        id: "T3JkZXJMaW5lOjE3NQ==",

        thumbnail: {
          alt: "",
          url: "https://dummyimage.com/600x400/000/fff",
        },
        thumbnail2x: {
          url: "https://dummyimage.com/600x400/000/fff",
        },
        variant: {
          id: "UHJvZHVjdFZhcmlhbnQ6MjIz",
          product: {
            id: "UHJvZHVjdDo3OQ==",
            name: "Bean Juice",
            slug: "bean-juice",
          },
        },
      },
    ],
    number: "76",
    statusDisplay: "Fulfilled",
    token: "c2deea58-00ad-4838-bb7b-0678fd4f1f38",
    total: {
      gross: { amount: 29.24, currency: "USD" },
      net: { amount: 29.24, currency: "USD" },
    },
  },
] as OrdersByUser_me_orders_edges_node[];

const getLinkCalledProps = (path: string, query?: UknownObject) => [
  generatePath(path, query),
  generatePath(path, query),
  { locale: undefined, scroll: true, shallow: undefined },
];

(global as any).matchMedia = (media: any) => ({
  addListener: jest.fn(),
  matches: true,
  removeListener: jest.fn(),
});

describe("<OrderTable />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <OrderTable isGuest orders={[]} />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should render passed orders array", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <OrderTable isGuest orders={ORDERS} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("77");
    expect(wrapper.text()).toContain("9/4/2019");
    expect(wrapper.text()).toContain("Unfulfilled");
    expect(wrapper.text()).toContain("42.91");

    expect(wrapper.text()).toContain("76");
    expect(wrapper.text()).toContain("6/10/2019");
    expect(wrapper.text()).toContain("Fulfilled");
    expect(wrapper.text()).toContain("29.24");
  });
  it("should navigate to particular order when clicking on order row", () => {
    const pushSpy = jest.fn().mockImplementation(() => new Promise(r => r()));
    let wrapper = mount(
      <IntlProvider locale="en">
        <RouterContext.Provider value={{ push: pushSpy } as any}>
          <OrderTable isGuest orders={ORDERS} />
        </RouterContext.Provider>
      </IntlProvider>
    );
    const { token } = ORDERS[0];

    wrapper.find(S.Row).at(1).simulate("click");

    expect(pushSpy).toHaveBeenCalledWith(
      ...getLinkCalledProps(paths.guestOrderDetail, { token })
    );

    wrapper = mount(
      <IntlProvider locale="en">
        <RouterContext.Provider value={{ push: pushSpy } as any}>
          <OrderTable isGuest={false} orders={ORDERS} />
        </RouterContext.Provider>
      </IntlProvider>
    );

    pushSpy.mockClear();
    wrapper.find(S.Row).at(1).simulate("click");

    expect(pushSpy).toHaveBeenCalledWith(
      ...getLinkCalledProps(paths.accountOrderDetail, {
        token,
      })
    );
  });

  it("should navigate to product page when clicking on product thumbnail", () => {
    const pushSpy = jest.fn().mockImplementation(() => new Promise(r => r()));
    const wrapper = mount(
      <IntlProvider locale="en">
        <RouterContext.Provider value={{ push: pushSpy } as any}>
          <OrderTable isGuest orders={ORDERS} />
        </RouterContext.Provider>
      </IntlProvider>
    );

    wrapper.find(Thumbnail).first().simulate("click");

    expect(pushSpy).toHaveBeenCalledWith(
      ...getLinkCalledProps(paths.product, { slug: "apple-juice" })
    );
  });
});
