import { OrderDetail } from "@sdk/fragments/types/OrderDetail";
import { User } from "@sdk/fragments/types/User";
import { ErrorListener } from "@sdk/helpers";
import { JobsManager } from "@sdk/jobs";
import { SaleorState } from "@sdk/state";
import { StateItems } from "@sdk/state/types";

import { PromiseRunResponse } from "../types";
import { DataErrorUserTypes, FunctionErrorUserTypes, IUserAPI } from "./types";

export class UserAPI extends ErrorListener implements IUserAPI {
  loaded: boolean;
  user?: User | null;
  token?: string;
  orders?: OrderDetail[];

  private saleorState: SaleorState;
  private jobsManager: JobsManager;

  private userLoaded: boolean;
  private tokenLoaded: boolean;

  constructor(
    saleorState: SaleorState,
    loadOnStart: boolean,
    jobsManager: JobsManager
  ) {
    super();
    this.saleorState = saleorState;
    this.jobsManager = jobsManager;

    this.loaded = false;
    this.userLoaded = false;
    this.tokenLoaded = false;

    this.saleorState.subscribeToChange(StateItems.USER, (user: User | null) => {
      this.user = user;
      this.userLoaded = true;
      this.loaded = this.userLoaded && this.tokenLoaded;
    });
    this.saleorState.subscribeToChange(StateItems.SIGN_IN_TOKEN, token => {
      this.token = token;
      this.tokenLoaded = true;
      this.loaded = this.userLoaded && this.tokenLoaded;
    });

    if (loadOnStart) {
      this.load();
    }
  }

  load = () => {
    this.saleorState.provideSignInToken();
    return {
      pending: false,
    };
  };

  signIn = async (
    email: string,
    password: string
  ): PromiseRunResponse<DataErrorUserTypes, FunctionErrorUserTypes> => {
    const { data, dataError } = await this.jobsManager.run("user", "signIn", {
      email,
      password,
    });

    return {
      data,
      dataError,
      pending: false,
    };
  };

  signOut = async (): PromiseRunResponse<
    DataErrorUserTypes,
    FunctionErrorUserTypes
  > => {
    await this.jobsManager.run("user", "signOut", undefined);

    return {
      pending: false,
    };
  };
}
