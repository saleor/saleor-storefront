import "./scss/MyData.scss";
import React from "react";

export interface IMyPasswordContent {}

const MyPasswordContent: React.FC<IMyPasswordContent> = () => (
  <div className="myData-container">
    <p>Password</p>
    <p>***************</p>
  </div>
);

export default MyPasswordContent;
