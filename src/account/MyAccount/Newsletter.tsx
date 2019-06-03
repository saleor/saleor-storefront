import React from "react";
import { Toggle } from "react-toggle-component";
import Card from "../Card";
import CardHeader from "../CardHeader";

const Newsletter: React.FC = () => {
  const header = <CardHeader title="NEWSLETTER" />;
  const content = <Toggle name="toggle-1" />;
  return <Card header={header}>{content}</Card>;
};

export default Newsletter;
