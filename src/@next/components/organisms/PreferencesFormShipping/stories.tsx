import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React, { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import styled from "styled-components";

import { PreferencesFormShipping } from ".";
import { preferencesEN, localesOptions } from "./fixtures";

const Container = styled.div`
  width: 600px;
`;

const withContainer = (children: ReactNode) => (
  <IntlProvider locale="en">
    <Container>{children}</Container>
  </IntlProvider>
);

const PROPS = {
  preferences: preferencesEN,
  localesOptions,
  formId: "preferences-form",
  handleSubmit: action("handleSubmit"),
};

storiesOf("@components/organisms/PreferencesFormShipping", module)
  .addParameters({ component: PreferencesFormShipping })
  .add("default", () => withContainer(<PreferencesFormShipping {...PROPS} />));
