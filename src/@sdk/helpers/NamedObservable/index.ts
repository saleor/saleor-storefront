import { INamedObservable } from "./types";

export class NamedObservable<T> implements INamedObservable<T> {
  private observers: Array<{
    name: T;
    func: (data: any) => any;
  }>;
  private notifiedObservers: Array<(data: any) => any>;

  constructor() {
    this.observers = [];
    this.notifiedObservers = [];
  }

  subscribeToChange = (name: T, func: (data: any) => any) => {
    this.observers.push({
      func,
      name,
    });
  };

  unsubscribeToChange = (name: T, func: (data: any) => any) => {
    this.observers = this.observers.filter(
      observer => name !== observer.name && func !== observer.func
    );
  };

  subscribeToNotifiedChanges = (func: (data: any) => any) => {
    this.notifiedObservers.push(func);
  };

  unsubscribeToNotifiedChanges = (func: (data: any) => any) => {
    this.notifiedObservers = this.notifiedObservers.filter(
      notifiedObserverFunc => func !== notifiedObserverFunc
    );
  };

  protected notifyChange = (name: T, data: any) => {
    this.observers.forEach(observer => {
      if (name === observer.name) {
        observer.func(data);
      }
    });
    this.notifiedObservers.forEach(notifiedObserverFunc => {
      notifiedObserverFunc(data);
    });
  };
}
