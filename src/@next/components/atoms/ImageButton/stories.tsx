import React from "react";

import { ImageButton } from ".";
import { createStory } from "../baseStory";

createStory("ImageButton")
  .add("edit icon", () => <ImageButton type="edit" />)
  .add("trash icon", () => <ImageButton type="trash" />);
