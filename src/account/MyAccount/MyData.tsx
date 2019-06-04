import React, { useContext, useState } from "react";
import { UserContext } from "../../components/User/context";
import Card from "../Card";
import CardHeader from "../CardHeader";
import MyDataContent from "./MyDataContent";
import MyDataEdit from "./MyDataEdit";

export interface IMyData {
  firstName: string;
  lastName: string;
  email: string;
}

const MyData: React.FC = () => {
  const [isEditing, setEditing] = useState(false);
  const { user } = useContext(UserContext);
  const onClick = () => {
    setEditing(!isEditing);
  };
  const header = (
    <CardHeader title="MY DATA" editing={isEditing} onClick={onClick} />
  );

  const content = isEditing ? (
    <MyDataEdit
      firstName={user.firstName}
      lastName={user.lastName}
      email={user.email}
    />
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
