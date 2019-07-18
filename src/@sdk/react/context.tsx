import ApolloClient from "apollo-client";
import React from "react";

export const ApolloContext = React.createContext<null | ApolloClient<any>>(
  null
);
