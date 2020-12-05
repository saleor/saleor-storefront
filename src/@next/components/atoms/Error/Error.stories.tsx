import React from "react";

import { Story } from "@storybook/react";

import { Error } from ".";
import { IErrorProps } from "./Error";

export default {
  title: "@components/atoms/Error",
  component: Error,
};

const Template: Story<IErrorProps> = args => <Error {...args} />;

export const Default = Template.bind({});
Default.args = { message: "Error occurred :(" };
