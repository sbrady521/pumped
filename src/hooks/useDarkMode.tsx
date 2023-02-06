import { useEffect, useState } from 'react';

type StoredValue =  string | boolean | number | undefined

const useLocalStorage = (key: string, initialValue?: string): [StoredValue, (val: StoredValue) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) as string | boolean | number : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: StoredValue | ((val: StoredValue) => StoredValue)): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage('dark-theme');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    console.log({ enabled, bodyClass })

    enabled ? bodyClass.add(className) : bodyClass.remove(className);
  }, [enabled]);

  return [enabled, setEnabled] as const;
};

export default useDarkMode;