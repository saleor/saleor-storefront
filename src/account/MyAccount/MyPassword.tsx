import React, { useState } from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";

export interface IMyPassword {}

const MyPassword: React.FC<IMyPassword> = () => {
  const [isEditing, setEditing] = useState(false);
  const onClick = () => {
    setEditing(!isEditing);
  };
  const header = (
    <CardHeader
      title="MY ACCOUNT PASSWORD"
      editing={isEditing}
      onClick={onClick}
    />
  );
  const content = (
    <>
      <p>Password</p>
      <br />
      <p>***************</p>
    </>
  );
  return <Card header={header}>{content}</Card>;
};

export default MyPassword;
