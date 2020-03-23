import { LocalStorageItems } from "./types";

interface IRepositoryObservable {
  subscribeToChange: (
    name: LocalStorageItems,
    func: (data: any) => any
  ) => void;
  unsubscribeToChange: (
    name: LocalStorageItems,
    func: (data: any) => any
  ) => void;
  subscribeToNotifiedChanges: (func: (data: any) => any) => void;
  unsubscribeToNotifiedChanges: (func: (data: any) => any) => void;
}

export class RepositoryObservable implements IRepositoryObservable {
  private observers: Array<{
    name: LocalStorageItems;
    func: (data: any) => any;
  }>;
  private notifiedObservers: Array<(data: any) => any>;

  constructor() {
    this.observers = [];
    this.notifiedObservers = [];
  }

  subscribeToChange = (name: LocalStorageItems, func: (data: any) => any) => {
    this.observers.push({
      func,
      name,
    });
  };

  unsubscribeToChange = (name: LocalStorageItems, func: (data: any) => any) => {
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

  protected notifyChange = (name: LocalStorageItems, data: any) => {
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
