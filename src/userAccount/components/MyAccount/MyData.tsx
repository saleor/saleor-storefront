import React from "react";
import Card from "../Card";

export interface IMyData {}

const MyData: React.FC<IMyData> = () => {
  const content = (
    <>
      <h4>Account Name</h4>
      <h4>E-mail Address</h4>
      <h4>Phone Number</h4>
    </>
  );

  return <Card header="MY DATA">{content}</Card>;
};

export default MyData;
