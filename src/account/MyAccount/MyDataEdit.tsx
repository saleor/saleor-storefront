import React from "react";
import { Button, Form, TextField } from "../../components";

import { IMyData } from "./MyData";

const MyDataEdit: React.FC<IMyData> = props => {
  return (
    <Form data={props}>
      <TextField
        name="firstName"
        autoComplete="firstName"
        label="First Name"
        type="text"
        styleType="grey"
        required
      />
      <TextField
        name="lastName"
        label="Last Name"
        type="text"
        styleType="grey"
        required
      />
      <TextField
        name="email"
        label="E-mail address"
        type="email"
        styleType="grey"
        required
      />
      <div className="login-form__button">
        <Button type="button">Save</Button>
      </div>
    </Form>
  );
};

export default MyDataEdit;
