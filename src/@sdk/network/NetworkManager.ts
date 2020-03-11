export interface INetworkQueue {
  addToQueue: (func: () => any) => void;
}

export class NetworkQueue implements INetworkQueue {
  private queue: Array<() => any>;

  constructor() {
    this.queue = [];
    window.addEventListener("online", this.onOnline);
  }

  addToQueue(func: () => any) {
    if (navigator.onLine) {
      func();
    } else {
      this.queue.push(func);
    }
  }

  private onOnline() {
    this.queue.forEach(func => func());
    this.queue = [];
  }
}
