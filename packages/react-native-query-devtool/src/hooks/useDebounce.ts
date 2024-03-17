import { useEffect, useRef } from "react";

const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number,
): ((...args: T) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup the previous timeout on unmount or re-render
    return (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: T): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout((): void => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebounce;
