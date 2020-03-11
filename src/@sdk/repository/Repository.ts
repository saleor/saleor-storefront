import { RepositoryObservable } from "./RepositoryObserver";
import { LocalStorageItems } from "./types";

export class Repository extends RepositoryObservable {
  protected saveItem(name: LocalStorageItems, item: string | null): void {
    if (item) {
      localStorage.setItem(name, item);
    } else {
      localStorage.removeItem(name);
    }
    this.notify(name, item);
  }
  protected retrieveItem(name: LocalStorageItems): string | null {
    return localStorage.getItem(name);
  }
  protected saveObject<T extends object>(
    name: LocalStorageItems,
    object: T | null
  ): void {
    if (object) {
      localStorage.setItem(name, JSON.stringify(object));
    } else {
      localStorage.removeItem(name);
    }
    this.notify(name, object);
  }
  protected retrieveObject<T extends object>(
    name: LocalStorageItems
  ): T | null {
    return JSON.parse(localStorage.getItem(name) || "");
  }
}
