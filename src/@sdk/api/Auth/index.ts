import { User } from "@sdk/fragments/gqlTypes/User";
import { ErrorListener } from "@sdk/helpers";
import { JobsManager } from "@sdk/jobs";
import { SaleorState } from "@sdk/state";
import { StateItems } from "@sdk/state/types";

import { PromiseRunResponse } from "../types";
import { DataErrorAuthTypes, FunctionErrorAuthTypes, IAuthAPI } from "./types";

export class AuthAPI extends ErrorListener implements IAuthAPI {
  loaded: boolean;
  user?: User | null;
  token?: string;

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

      if (!this.saleorState.signInToken && window.PasswordCredential) {
        this.autoSignIn();
      }
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
    password: string,
    autoSignIn: boolean = true
  ): PromiseRunResponse<DataErrorAuthTypes, FunctionErrorAuthTypes> => {
    const { data, dataError } = await this.jobsManager.run("auth", "signIn", {
      email,
      password,
    });

    if (autoSignIn && !dataError?.error && window.PasswordCredential) {
      navigator.credentials.store(
        new window.PasswordCredential({
          id: email,
          password,
        })
      );
    }

    return {
      data,
      dataError,
      pending: false,
    };
  };

  signOut = async (): PromiseRunResponse<
    DataErrorAuthTypes,
    FunctionErrorAuthTypes
  > => {
    await this.jobsManager.run("auth", "signOut", undefined);

    if (navigator.credentials && navigator.credentials.preventSilentAccess) {
      navigator.credentials.preventSilentAccess();
    }

    return {
      pending: false,
    };
  };

  private autoSignIn = async () => {
    const credentials = await (navigator.credentials as any).get({
      password: true,
    });

    if (credentials) {
      const { dataError } = await this.signIn(
        credentials.id,
        credentials.password,
        true
      );

      if (dataError?.error) {
        this.fireError(dataError.error, DataErrorAuthTypes.SIGN_IN);
      }
    }
  };
}
