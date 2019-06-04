import "./scss/Toggle.scss";

import React from "react";
import { ReactToggleThemeProvider, Toggle } from "react-toggle-component";

export interface IToggleElement {
  message: string;
  toggleName: string;
}

const toggleTheme = {
  height: "24px",
  width: "48px",

  borderWidth: "0px",
  borderColor: "#fff",

  leftBackgroundColor: " #C6C6C6;",
  rightBackgroundColor: "#3EE7CD",

  radius: "256px",
  radiusBackground: "256px",
  knobRadius: "100%",

  knobWidth: "20px",
  knobHeight: "20px",
  knobGap: "2px",

  knobColor: "#F1F5F5",
  leftKnobColor: "#F1F5F5",
  rightKnobColor: "#F1F5F5"
};

const ToggleElement: React.FC<IToggleElement> = ({ message, toggleName }) => {
  return (
    <div className="toggleElement-container">
      <div className="toggleElement-container__toggle">
        <ReactToggleThemeProvider theme={toggleTheme}>
          <Toggle name={toggleName} />
        </ReactToggleThemeProvider>
      </div>
      <div className="toggleElement-container__message">{message}</div>
    </div>
  );
};

export default ToggleElement;
