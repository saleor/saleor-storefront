import React from "react";
import { BrowserRouter } from "react-router-dom";

import { NavLink } from ".";
import { createStory } from "../baseStory";
import { mockItemRoute } from "./fixtures";

createStory("NavLink").add("default", () => (
  <BrowserRouter>
    <NavLink item={mockItemRoute}>ELEMENT I</NavLink>
  </BrowserRouter>
));
