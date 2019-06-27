import { action } from "@storybook/addon-actions";
import React from "react";

import { NotificationTemplate } from ".";
import { createStory } from "../baseStory";

const onClick = action("onClick called");

createStory("NotificationTemplate").add("default", () => (
  <NotificationTemplate
    close={onClick}
    id="test"
    message={{ title: "test" }}
    options={{ type: "action" }}
    style={{ margin: 1 }}
  />
));
