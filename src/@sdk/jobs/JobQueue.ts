export interface IJobQueue {
  addToQueue: (func: () => any) => void;
}

export class JobQueue implements IJobQueue {
  private queue: Array<() => any>;

  constructor() {
    this.queue = [];
    window.addEventListener("online", this.onOnline);
  }

  addToQueue(func: () => any) {
    if (navigator.onLine) {
      func();
    } else {
      // TODO: add pending save info to localStorage
      console.log("TODO: add pending save info to localStorage");
      this.queue.push(func);
    }
  }

  private onOnline() {
    // TODO: remove pending save info to localStorage
    console.log("TODO: remove pending save info to localStorage");
    this.queue.forEach(func => func());
    this.queue = [];
  }
}
