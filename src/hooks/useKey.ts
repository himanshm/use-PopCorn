import { useEffect } from 'react';

export function useKey(keyboardKey: string, action: () => void) {
  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if (event.code.toLowerCase() === keyboardKey.toLowerCase()) {
        action();
      }
    };
    document.addEventListener<'keydown'>('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [action, keyboardKey]);
}
