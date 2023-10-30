import { MutableRefObject, useEffect } from "react";
import {
  Blocker,
  BlockerWithPadding,
  BlockerWithoutAnyPadding,
} from "./blocker";
import { nonNullable } from "@/helpers/nonNullable";

export const bodyRef: MutableRefObject<HTMLElement | undefined> = {
  current: typeof window === "undefined" ? undefined : document.body,
};

export default function useBlockScroll(
  isBlocking: boolean,
  element?: MutableRefObject<HTMLElement | undefined | null>,
  paddingElementsInRef?: MutableRefObject<HTMLElement | undefined | null>[],
  removePaddingInstead?: boolean,
) {
  useEffect(() => {
    if (!isBlocking) {
      return undefined;
    }

    const paddingElements = paddingElementsInRef?.map((element) =>
      nonNullable(element.current, "undefined element in paddingElementsInRef"),
    ) ?? [element?.current ?? document.body];

    let blocker = Blocker(element?.current ?? document.body);

    if (removePaddingInstead) {
      blocker = BlockerWithoutAnyPadding(blocker, paddingElements);
    } else {
      blocker = BlockerWithPadding(
        blocker,
        element?.current ?? document.body,
        paddingElements,
      );
    }

    blocker.block();

    return () => {
      blocker.unblock();
    };
  }, [isBlocking, element, ...(paddingElementsInRef ?? [])]);
}
