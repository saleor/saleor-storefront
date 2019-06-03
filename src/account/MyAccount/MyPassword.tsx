import React, { useState } from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import MyPasswordContent from "./MyPasswordContent";
import MyPasswordEdit from "./MyPasswordEdit";

const MyPassword: React.FC = () => {
  const [isEditing, setEditing] = useState(false);
  const onClick = () => {
    setEditing(!isEditing);
  };
  const header = (
    <CardHeader title="MY PASSWORD" editing={isEditing} onClick={onClick} />
  );
  const content = isEditing ? (
    <MyPasswordEdit setEditing={setEditing} />
  ) : (
    <MyPasswordContent />
  );
  return <Card header={header}>{content}</Card>;
};

export default MyPassword;
