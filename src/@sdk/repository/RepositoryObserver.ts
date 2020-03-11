import { LocalStorageItems } from "./types";

interface IRepositoryObservable {
  subscribe: (f: (name: LocalStorageItems, data: any) => any) => void;
  unsubscribe: (f: (name: LocalStorageItems, data: any) => any) => void;
}

export class RepositoryObservable implements IRepositoryObservable {
  private observers: any[];

  constructor() {
    this.observers = [];
  }

  subscribe = (f: (name: LocalStorageItems, data: any) => any) => {
    this.observers.push(f);
  };

  unsubscribe = (f: (name: LocalStorageItems, data: any) => any) => {
    this.observers = this.observers.filter(observer => observer !== f);
  };

  protected notify = (name: LocalStorageItems, data: any) => {
    this.observers.forEach(observer => observer(name, data));
  };
}
