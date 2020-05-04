export interface INamedObservable<T> {
  subscribeToChange: (name: T, func: (data: any) => any) => void;
  unsubscribeToChange: (name: T, func: (data: any) => any) => void;
  subscribeToNotifiedChanges: (func: (data: any) => any) => void;
  unsubscribeToNotifiedChanges: (func: (data: any) => any) => void;
}
