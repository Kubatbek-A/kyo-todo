import { useCallback, useRef } from "react";

/**
 * Stable link to the newest version of the callback
 */
export default function useEventCallback<T extends (...args: any[]) => unknown>(
  callback: T,
): T {
  const ref = useRef(callback);

  ref.current = callback;

  return useCallback(
    ((...args) => {
      return ref.current(...args);
    }) as T,
    [],
  );
}
