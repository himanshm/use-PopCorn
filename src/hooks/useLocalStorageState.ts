import { useState, useEffect } from 'react';
import { WatchedMoviesProps } from '../utils/movie-types';

type UseLocalStorageStateReturnType = [
  WatchedMoviesProps[],
  React.Dispatch<React.SetStateAction<WatchedMoviesProps[]>>
];

export function useLocalStorageState(
  initialState: string[],
  storageKey: string
): UseLocalStorageStateReturnType {
  const [value, setValue] = useState<WatchedMoviesProps[]>(() => {
    const storedValue: string | null = localStorage.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
}
