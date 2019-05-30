import React from "react";

export interface IMyDataContent {
  firstName?: string;
  lastName?: string;
  email: string;
}

const MyDataContent: React.FC<IMyDataContent> = ({
  firstName = " ",
  lastName = " ",
  email
}) => (
  <>
    <h4>First Name</h4>
    <div>{firstName}</div>
    <h4>Last Name</h4>
    <p>{lastName}</p>
    <h4>E-mail Address</h4>
    <p>{email}</p>
  </>
);

export default MyDataContent;
