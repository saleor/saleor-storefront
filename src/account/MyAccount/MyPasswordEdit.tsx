import React from "react";
import { Button, Form, TextField } from "../../components";

export interface IMyPasswordEdit {
  setEditing: (isEditing: boolean) => void;
}

const MyPasswordEdit: React.FC<IMyPasswordEdit> = ({ setEditing }) => {
  return (
    <Form>
      <TextField
        name="password"
        autoComplete="password"
        label="Current password"
        type="password"
        styleType="grey"
        required
      />
      <TextField
        name="new-password"
        label="New password"
        type="password"
        styleType="grey"
        required
      />
      <TextField
        name="confirm-password"
        label="Confirm password"
        type="password"
        styleType="grey"
        required
      />
      <div className="login-form__button">
        <Button type="button">Save</Button>
      </div>
    </Form>
  );
};

export default MyPasswordEdit;
