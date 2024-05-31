import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay = 500,
) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (!timer.current) {
        return;
      }

      clearTimeout(timer.current);
    };
  }, []);

  function debouncedFunction(...args: Parameters<T>) {
    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);

    clearTimeout(timer.current);

    timer.current = newTimer;
  }

  return debouncedFunction;
}
