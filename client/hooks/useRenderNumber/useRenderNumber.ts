import { useRef } from "react";

/**
 * @returns render number from 0
 */
export default function useRenderNumber(): number {
  const renderNumber = useRef(0);
  const currentRenderNumber = renderNumber.current;

  if (typeof window !== "undefined") {
    renderNumber.current += 1;
  }

  return currentRenderNumber;
}
