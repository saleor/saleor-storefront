/* eslint-disable no-console */

import { useState } from "react";

export type SetLocalStorageValue<T> = T | ((prevValue: T) => T);
export type SetLocalStorage<T> = (value: SetLocalStorageValue<T>) => void;
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetLocalStorage<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: SetLocalStorageValue<T>) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
