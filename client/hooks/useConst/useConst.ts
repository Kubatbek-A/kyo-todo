import { useRef } from "react";

/**
 * Remembers the first value and always returns it
 */
export default function useConst<T>(value: T): T {
  return useRef(value).current;
}
