import React from "react";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary";
  btnRef?: React.RefObject<HTMLButtonElement>;
}
