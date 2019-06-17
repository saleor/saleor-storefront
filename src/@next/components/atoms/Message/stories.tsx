import { action } from "@storybook/addon-actions";
import React from "react";

import { Message } from ".";
import { createStory } from "../baseStory";

createStory("Message")
  .add("neutral", () => (
    <Message title="Sample Message" onClose={action("close callback")} />
  ))
  .add("success", () => (
    <Message
      title="Sample Message"
      status="success"
      onClose={action("close callback")}
    />
  ))
  .add("error", () => (
    <Message
      title="Sample Message"
      status="error"
      onClose={action("close callback")}
    />
  ));
