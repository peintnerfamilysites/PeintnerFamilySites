import { useEffect } from 'react';

export function useScrollLock(isLocked) {
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isLocked) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isLocked]);
}
