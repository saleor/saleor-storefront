import "./scss/helloPrompts.scss";

import * as React from "react";

export interface HelloPromptProps {
  name: string;
}

const HelloPrompt = ({ name }) => {
  return (
    <div className="hello-prompt">
      <h3>Hej{name !== "" ? `, ${name}!` : "!"}</h3>
      <p>Witaj na stronie swojego konta</p>
    </div>
  );
};

export default HelloPrompt;
