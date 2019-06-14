import React from "react";

import CartAdd from "images/cart-add.svg";

import { IconSVG } from ".";
import { createStory } from "../baseStory";

createStory("IconSvg").add("example svg", () => <IconSVG path={CartAdd} />);
