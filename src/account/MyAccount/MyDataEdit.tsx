import React from "react";
import { Button, Form, TextField } from "../../components";

export interface IMyDataEdit {}

const MyDataEdit: React.FC<IMyDataEdit> = () => {
  return (
    <Form>
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
        type="mail"
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
