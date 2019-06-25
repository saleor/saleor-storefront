import React from "react";
import { BrowserRouter } from "react-router-dom";

import { TopNavbar } from ".";
import { createStory } from "../baseStory";

createStory("TopNavbar").add("default", () => (
  <BrowserRouter>
    <TopNavbar />
  </BrowserRouter>
));
