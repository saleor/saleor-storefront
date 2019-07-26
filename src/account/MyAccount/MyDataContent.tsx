import "./scss/MyData.scss";

import React from "react";

import { IMyData } from "./MyData";

const MyDataContent: React.FC<IMyData> = ({
  firstName = "",
  lastName = "",
  email,
}) => (
  <div className="myData-container">
    <p>First Name</p>
    <p>{firstName ? firstName : "-"}</p>
    <p>Last Name</p>
    <p>{lastName ? lastName : "-"}</p>
    <p>E-mail Address</p>
    <p>{email}</p>
  </div>
);

export default MyDataContent;
