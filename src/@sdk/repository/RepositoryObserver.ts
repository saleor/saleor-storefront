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
}

export class RepositoryObservable implements IRepositoryObservable {
  private observers: Array<{
    name: LocalStorageItems;
    func: (data: any) => any;
  }>;

  constructor() {
    this.observers = [];
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

  protected notifyChange = (name: LocalStorageItems, data: any) => {
    this.observers.forEach(observer => {
      if (name === observer.name) {
        observer.func(data);
      }
    });
  };
}
