import React, { useState } from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";

export interface IMyData {}

const MyData: React.FC<IMyData> = () => {
  const [isEditing, setEditing] = useState(false);
  const onClick = () => {
    setEditing(!isEditing);
  };
  const header = (
    <CardHeader title="MY DATA" editing={isEditing} onClick={onClick} />
  );

  const content = (
    <>
      <h4>Account Name</h4>
      <h4>E-mail Address</h4>
      <h4>Phone Number</h4>
    </>
  );

  return <Card header={header}>{content}</Card>;
};

export default MyData;
