import { storiesOf } from "@storybook/react";
import { createBrowserHistory } from "history";
import React from "react";
import { OrderTabel } from ".";

const history = createBrowserHistory();
const ORDERS = [
  {
    node: {
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
  },
  {
    node: {
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
  },
];

storiesOf("@components/molecules/OrderTabel", module)
  .addParameters({ component: OrderTabel })
  .add("default", () => {
    // this is added to fix issue when running on machines with different locales
    // so one one machine price is displayed as $42.24 and on others as US$ 42.24 etc
    Number.prototype.toLocaleString = () => "";
    return <OrderTabel history={history} orders={ORDERS} />;
  });
