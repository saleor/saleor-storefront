import React from "react";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  btnRef?: React.RefObject<HTMLButtonElement>;
}
