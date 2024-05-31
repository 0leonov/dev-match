import { useEffect, useRef } from "react";

type Timer = ReturnType<typeof setTimeout>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay = 500,
) {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;

      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args: Parameters<T>) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as T;

  return debouncedFunction;
}
