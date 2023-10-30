import { nonNullable } from "@/helpers/nonNullable";
import { DependencyList, MutableRefObject, useEffect } from "react";

export default function useOuterClick(
  element: MutableRefObject<HTMLElement | null | undefined>,
  callback: () => void,
  deps: DependencyList = [],
  activeIf?: () => boolean,
) {
  useEffect(() => {
    const currentElement = nonNullable(element.current);

    const checkIsCurrent = (element: HTMLElement): boolean => {
      if (element === currentElement) return true;
      if (element === document.body) return false;
      if (element.parentElement === null) return false;

      return checkIsCurrent(element.parentElement);
    };

    const handle = (event: MouseEvent) => {
      if (activeIf === undefined || activeIf() === false) return;

      const clicked = event.target as HTMLElement;

      if (!checkIsCurrent(clicked)) {
        callback();
      }
    };

    window.addEventListener("click", handle);

    return () => window.removeEventListener("click", handle);
  }, [callback, activeIf, ...deps]);
}
