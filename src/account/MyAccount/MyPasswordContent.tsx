import React from "react";

export interface IMyPasswordContent {}

const MyPasswordContent: React.FC<IMyPasswordContent> = () => (
  <>
    <div>
      <p>Password</p>
      <p>***************</p>
    </div>
  </>
);

export default MyPasswordContent;
