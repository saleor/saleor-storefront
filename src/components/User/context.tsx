import { ApolloError } from "apollo-client";
import * as React from "react";

import { ShowOverlayType } from "../Overlay/context";

interface UserInterface {
  email: string;
}

export interface UserContextInterface {
  loading: boolean;
  errors: ApolloError[] | null;
  token: string | null;
  user: UserInterface | null;
  authenticate(token: string): void;
  createCustomer(
    email: string,
    password: string,
    showNotification?: ShowOverlayType
  ): void;
  logout(showNotification?: ShowOverlayType): void;
  login(
    email: string,
    password: string,
    showNotification?: ShowOverlayType
  ): void;
  resetPassword(email: string, showNotification?: ShowOverlayType): void;
}

/* tslint:disable:no-empty */
export const UserContext = React.createContext<UserContextInterface>({
  authenticate: token => {},
  createCustomer: (email, password) => {},
  errors: null,
  loading: false,
  login: (email, password) => {},
  logout: () => {},
  resetPassword: email => {},
  token: null,
  user: null
});
/* tslint:enable:no-empty */
