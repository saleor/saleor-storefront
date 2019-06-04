import React from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import ToggleElement from "./ToggleElement";

const Newsletter: React.FC = () => {
  const header = <CardHeader title="NEWSLETTER" />;
  const messageEmail =
    "I want to recieve newsletter with newest information about new sales and products";
  const messageSMS = "I want to receive newsletter via SMS";
  const content = (
    <>
      <ToggleElement message={messageEmail} toggleName={"email"} />
      <ToggleElement message={messageSMS} toggleName={"sms"} />
    </>
  );
  return <Card header={header}>{content}</Card>;
};

export default Newsletter;
