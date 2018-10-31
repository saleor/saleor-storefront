import * as React from "react";

interface ErrorProps {
  error: string;
}

export const Error: React.SFC<ErrorProps> = ({ error }) => <>{error}</>;
export default Error;
