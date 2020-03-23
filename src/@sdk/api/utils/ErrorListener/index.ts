import { ApolloErrorWithUserInput } from "@sdk/react/types";

import { IErrorListener } from "./types";

export class ErrorListener implements IErrorListener {
  private errorListeners: Array<(error: ApolloErrorWithUserInput | any) => any>;

  constructor() {
    this.errorListeners = [];
  }

  addOnErrorListener = (
    func: (error: ApolloErrorWithUserInput | any) => any
  ) => {
    this.errorListeners.push(func);
  };

  removeOnErrorListener = (
    func: (error: ApolloErrorWithUserInput | any) => any
  ) => {
    this.errorListeners = this.errorListeners.filter(
      errorListenersFunc => func !== errorListenersFunc
    );
  };

  protected fireError = (error: ApolloErrorWithUserInput | any) => {
    this.errorListeners.forEach(errorListenersFunc => {
      errorListenersFunc(error);
    });
  };
}
