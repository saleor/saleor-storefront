import React from "react";

export interface IErrorProps {
  message: string;
}

export const Error: React.FC<IErrorProps> = ({ message }) => {
  return <>{message}</>;
};
Error.displayName = "Error";
export default Error;
