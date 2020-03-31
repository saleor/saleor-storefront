import { storiesOf } from "@storybook/react";
import React from "react";

import { ErrorMessage } from ".";

const ERRORS = [{ field: "Field", message: "Error Message" }];

storiesOf("@components/atoms/ErrorMessage", module)
  .addParameters({ component: ErrorMessage })
  .add("default", () => <ErrorMessage errors={ERRORS} />)
  .add("with multiple errors", () => (
    <ErrorMessage errors={[...ERRORS, ...ERRORS]} />
  ));
