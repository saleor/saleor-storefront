import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Button, TextField, SelectField, Message } from "../../components";

storiesOf("Components", module)
  .add("Button", () => (
    <Button>
      <span>Sample Button</span>
    </Button>
  ))
  .add("Text Field", () => (
    <div className="input-section">
      <TextField label="Input label" defaultValue="Text inside"/>
      <TextField label="Input label" defaultValue="Text inside" disabled={true} />
      <TextField label="Input label" defaultValue="Text inside" helpText={"Assistive text"} />
      <TextField label="Input label" defaultValue="Text inside" error={"There is a problem with this field"} />
    </div>
  ))
  .add("Select Field", () => (
    <SelectField
      label="Dropdown Label"
      options={[
        {label: "Option I Not available", value: "option1", isDisabled: true},
        {label: "Option II", value: "option2"},
        {label: "Option III", value: "option3"}
      ]}/>
  ))
  .add("Message", () => (
    <div className="message-section">
      <Message status="success" title="Connection established" visible={true}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget erat id augue tincidunt aliquam ut efficitur nunc. Nullam in venenatis ante. Aenean at felis non sapien interdum.
        </p>
      </Message>
      <Message title="Reconnecting" visible={true}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget erat id augue tincidunt aliquam ut efficitur nunc. Nullam in venenatis ante. Aenean at felis non sapien interdum.
        </p>
      </Message>
      <Message status="error" title="Lost connection" visible={true}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget erat id augue tincidunt aliquam ut efficitur nunc. Nullam in venenatis ante. Aenean at felis non sapien interdum.
        </p>
      </Message>
    </div>
  ));
