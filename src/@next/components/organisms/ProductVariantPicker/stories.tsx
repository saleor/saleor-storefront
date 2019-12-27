import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React, { ReactNode } from "react";
import styled from "styled-components";

import { ProductVariantPicker } from ".";
import { productVariants } from "./fixtures";

const Container = styled.div`
  width: 600px;
`;

const withContainer = (children: ReactNode) => (
  <Container> {children}</Container>
);

const PRODUCT_VARIANTS = productVariants;
const PROPS = {
  onChange: action("onChange"),
  productVariants: PRODUCT_VARIANTS,
};

storiesOf("@components/organisms/ProductVariantPicker", module).add(
  "default",
  () => withContainer(<ProductVariantPicker {...PROPS} />)
);
