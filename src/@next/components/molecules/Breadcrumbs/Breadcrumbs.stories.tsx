// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { Breadcrumbs } from ".";
import { IBreadcrumbsProps } from "./Breadcrumbs";

export default {
  title: "Breadcrumbs",
  component: Breadcrumbs,
};

const Template: Story<IBreadcrumbsProps> = args => (
  <MemoryRouter>
    <Breadcrumbs {...args} />
  </MemoryRouter>
);

export const Empty = Template.bind({});
Empty.args = { breadcrumbs: [] };

export const NestedCategories = Template.bind({});
NestedCategories.args = {
  breadcrumbs: [
    {
      link: "/clothing",
      value: "Clothing",
    },
    {
      link: "/shirts",
      value: "Shirts",
    },
    {
      link: "/slim",
      value: "Slim",
    },
  ],
};
