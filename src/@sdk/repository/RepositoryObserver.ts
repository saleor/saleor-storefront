interface IRepositoryObservable {
  subscribe: (f: (name: string, data: any) => any) => void;
  unsubscribe: (f: (name: string, data: any) => any) => void;
}

class RepositoryObservable implements IRepositoryObservable {
  private observers: any[];

  constructor() {
    this.observers = [];
  }

  subscribe = (f: (name: string, data: any) => any) => {
    this.observers.push(f);
  };

  unsubscribe = (f: (name: string, data: any) => any) => {
    this.observers = this.observers.filter(observer => observer !== f);
  };

  protected notify = (name: string, data: any) => {
    this.observers.forEach(observer => observer(name, data));
  };
}
