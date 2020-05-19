import { ApolloClientManager } from "@sdk/data/ApolloClientManager";
import { LocalStorageHandler } from "@sdk/helpers/LocalStorageHandler";
import {
  DataErrorAuthTypes,
  FunctionErrorAuthTypes,
} from "@temp/@sdk/api/Auth/types";

import { JobRunResponse } from "../types";

export type PromiseUserJobRunResponse = Promise<
  JobRunResponse<DataErrorAuthTypes, FunctionErrorAuthTypes>
>;

export class AuthJobs {
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
          type: DataErrorAuthTypes.SIGN_IN,
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
