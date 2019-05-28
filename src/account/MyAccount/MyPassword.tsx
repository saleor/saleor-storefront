import React from "react";
import Card from "../Card";

export interface IMyPassword {}

const MyPassword: React.FC<IMyPassword> = () => {
  const content = (
    <>
      <p>Password</p>
      <br />
      <p>***************</p>
    </>
  );
  return <Card header="MY ACCOUNT PASSWORD">{content}</Card>;
};

export default MyPassword;
