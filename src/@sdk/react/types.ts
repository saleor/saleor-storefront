import { ApolloError } from "apollo-client";

export interface ApolloErrorWithUserInput extends ApolloError {
  extraInfo: {
    userInputErrors?: any[];
  };
}
