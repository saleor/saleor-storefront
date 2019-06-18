import React from "react";

import { Input } from ".";
import { createStory } from "../baseStory";

createStory("Input")
  .add("default", () => <Input placeholder="Text goes here" />)
  .add("error", () => <Input placeholder="Text goes here" error />)
  .add("disabled", () => <Input placeholder="Text goes here" disabled />);
