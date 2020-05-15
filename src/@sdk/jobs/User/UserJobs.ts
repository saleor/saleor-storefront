import {
  DataErrorUserTypes,
  FunctionErrorUserTypes,
} from "@sdk/api/User/types";
import { ApolloClientManager } from "@sdk/data/ApolloClientManager";
import { LocalStorageHandler } from "@sdk/helpers/LocalStorageHandler";

import { JobRunResponse } from "../types";

export type PromiseUserJobRunResponse = Promise<
  JobRunResponse<DataErrorUserTypes, FunctionErrorUserTypes>
>;

export class UserJobs {
  private apolloClientManager: ApolloClientManager;
  private localStorageHandler: LocalStorageHandler;

  constructor(
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    this.apolloClientManager = apolloClientManager;
    this.localStorageHandler = localStorageHandler;
  }

  signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): PromiseUserJobRunResponse => {
    const { data, error } = await this.apolloClientManager.signIn(
      email,
      password
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorUserTypes.SIGN_IN,
        },
      };
    } else {
      this.localStorageHandler.setSignInToken(data?.token || null);
      return {
        data,
      };
    }
  };

  signOut = async (): PromiseUserJobRunResponse => {
    this.localStorageHandler.clear();

    await this.apolloClientManager.signOut();

    return {};
  };
}
