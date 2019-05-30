import React, { useState, useContext } from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import { UserContext } from "../../components/User/context";
import MyDataContent from "./MyDataContent";
import MyDataEdit from "./MyDataEdit";

export interface IMyData {}

const MyData: React.FC<IMyData> = () => {
  const [isEditing, setEditing] = useState(false);
  const { user } = useContext(UserContext);
  const onClick = () => {
    setEditing(!isEditing);
  };
  const header = (
    <CardHeader title="MY DATA" editing={isEditing} onClick={onClick} />
  );

  const content = isEditing ? (
    <MyDataEdit />
  ) : (
    <MyDataContent
      firstName={user.firstName}
      lastName={user.lastName}
      email={user.email}
    />
  );

  return <Card header={header}>{content}</Card>;
};

export default MyData;
