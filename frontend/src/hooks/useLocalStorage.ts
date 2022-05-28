import { useState } from "react";

export function useLocalStorage<T>(localStorageKey: string, initialValue: T) {
  const getValue = () => {
    const valueString = localStorage.getItem(localStorageKey);
    return valueString ? JSON.parse(valueString) : initialValue;
  };

  const [value, setValue] = useState<T>(getValue);

  const saveValue = (value: T) => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
    setValue(value);
  };

  const resetValue = () => {
    localStorage.removeItem(localStorageKey);
    setValue(initialValue);
  };

  return {
    value,
    setValue: saveValue,
    resetValue,
  };
}
