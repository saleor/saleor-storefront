import { ApolloClientManager } from "@sdk/data/ApolloClientManager";
import { LocalStorageHandler } from "@sdk/helpers/LocalStorageHandler";
import {
  DataErrorAuthTypes,
  FunctionErrorAuthTypes,
} from "@temp/@sdk/api/Auth/types";

import { JobRunResponse } from "../types";
import { DataErrorCheckoutTypes } from "@temp/@sdk/api/Checkout/types";

export type PromiseAuthJobRunResponse = Promise<
  JobRunResponse<
    DataErrorAuthTypes | DataErrorCheckoutTypes,
    FunctionErrorAuthTypes
  >
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
  }): PromiseAuthJobRunResponse => {
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
    }

    this.localStorageHandler.setSignInToken(data?.token || null);

    const {
      data: checkoutData,
      error: checkoutError,
    } = await this.apolloClientManager.getCheckout(true, null);

    if (checkoutError) {
      return {
        dataError: {
          error: checkoutError,
          type: DataErrorCheckoutTypes.GET_CHECKOUT,
        },
      };
    } else if (checkoutData) {
      this.localStorageHandler.setCheckout(checkoutData);
    }

    return {
      data,
    };
  };

  signOut = async (): PromiseAuthJobRunResponse => {
    this.localStorageHandler.clear();

    await this.apolloClientManager.signOut();

    return {};
  };
}
