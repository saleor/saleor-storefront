import React from "react";

import styled from "styled-components";
import { TileGrid } from ".";
import { Tile } from "../";
import { createStory } from "../baseStory";

const tile = (
  <Tile header={<>This is header</>} footer={<>This is footer</>}>
    <p>Tile content</p>
  </Tile>
);

const tiles = [tile, tile, tile, tile, tile, tile];
createStory("TileGrid")
  .add("default", () => <TileGrid elements={tiles} />)
  .add("custom grid size", () => <TileGrid elements={tiles} md={6} lg={6} />);
