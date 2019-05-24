import React from "react";
import Card from "../Card";

export interface INewsletter {}

const Newsletter: React.FC<INewsletter> = () => {
  const header = <div>NEWSLETTER</div>;
  return <Card header={header}>aaa</Card>;
};

export default Newsletter;
