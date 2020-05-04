import { storiesOf } from "@storybook/react";
import React from "react";

import { styled } from "@styles";

import { ProductGallery } from ".";
import { eightImages, oneImage, threeImages } from "./fixtures";

const Container = styled.div``;
storiesOf("@components/organisms/ProductGallery", module)
  .addParameters({ component: ProductGallery })
  .add("default", () => <ProductGallery images={oneImage} />)
  .add("three Images", () => (
    <Container>
      <ProductGallery images={threeImages} />
    </Container>
  ))
  .add("eight Images", () => <ProductGallery images={eightImages} />);
