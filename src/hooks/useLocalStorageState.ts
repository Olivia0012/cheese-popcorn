import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useLocalStorageState<Type>(
  initialState: Array<Type>,
  key: string
): [Type[], Dispatch<SetStateAction<Type[]>>] {
  const [value, setValue] = useState<Type[]>(() => {
    const localStored = localStorage.getItem(key);
    return localStored ? JSON.parse(localStored) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
