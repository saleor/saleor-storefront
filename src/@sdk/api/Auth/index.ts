import { User } from "@sdk/fragments/gqlTypes/User";
import { ErrorListener } from "@sdk/helpers";
import { JobsManager } from "@sdk/jobs";
import { SaleorState } from "@sdk/state";
import { StateItems } from "@sdk/state/types";

import { PromiseRunResponse } from "../types";
import { DataErrorAuthTypes, FunctionErrorAuthTypes } from "./types";

export class AuthAPI extends ErrorListener {
  /**
   * Indicates if data is initialized, initially retrieved from cache or initially fetched.
   */
  loaded: boolean;
  /**
   * User object with currently signed in user data.
   */
  user?: User | null;
  /**
   * Indicates if user is signed in.
   */
  authenticated?: boolean;
  /**
   * Token used for user authentication.
   */
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
      if (this.loaded) {
        this.authenticated = !!this.user;
      }
    });
    this.saleorState.subscribeToChange(StateItems.SIGN_IN_TOKEN, token => {
      this.token = token;
      this.tokenLoaded = true;
      this.loaded = this.userLoaded && this.tokenLoaded;
      if (this.loaded) {
        this.authenticated = !!this.user;
      }
    });

    if (loadOnStart) {
      this.load();

      if (!this.saleorState.signInToken && window.PasswordCredential) {
        this.autoSignIn();
      }
    }
  }

  /**
   * Initialize data, retrieve initial cache or make initial fetches. If not changed in SDK config, called on start by default.
   */
  load = () => {
    this.saleorState.provideSignInToken();
    return {
      pending: false,
    };
  };

  /**
   * Tries to authenticate user with given email and password.
   * @param email Email used for authentication.
   * @param password Password used for authentication.
   * @param autoSignIn Indicates if SDK should try to sign in user with given credentials in future without explicitly calling this method. True by default.
   */
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

  /**
   * Sign out user by clearing cache, local storage and authentication token.
   */
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
