import React from "react";

import styled from "styled-components";
import { TileGrid } from ".";
import { createStory } from "../baseStory";

const GridElement = styled.div`
  background-color: lightgray;
  width: 100%;
  height: 17rem;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
`;

const tile = <GridElement>tile</GridElement>;

createStory("TileGrid").add("default", () => {
  const tiles = [tile, tile, tile, tile, tile, tile];
  return <TileGrid elements={tiles} />;
});
