export interface IBlocker {
  block(): boolean;
  unblock(): boolean;
  canBlock(): boolean;
}

export type IBlockers = Set<IBlocker>;

export function Blocker(
  element: HTMLElement,
  blockers = Blockers(element),
): IBlocker {
  const blocker = {
    block() {
      const willBlock = blockers.size === 0;

      if (willBlock) {
        element.style.overflow = "hidden";
      }

      blockers.add(blocker);

      return willBlock;
    },
    unblock() {
      blockers.delete(blocker);

      if (blockers.size === 0) {
        element.style.overflow = "";
      }

      return blockers.size === 0;
    },
    canBlock() {
      return blockers.size === 0;
    },
  };

  return blocker;
}

export function BlockerWithPadding(
  origin: IBlocker,
  element: HTMLElement,
  paddingElements: HTMLElement[],
): IBlocker {
  return {
    block() {
      if (origin.canBlock()) {
        const isBody = element === document.body;
        const widthWithScroll = isBody
          ? window.innerWidth
          : element.offsetWidth;
        const widthWithoutScroll = element.clientWidth;
        const scrollWidth = widthWithScroll - widthWithoutScroll;

        paddingElements.forEach((paddingElement) => {
          paddingElement.style.paddingRight = `${scrollWidth}px`;
        });
      }

      return origin.block();
    },
    unblock() {
      const unblocked = origin.unblock();

      if (unblocked) {
        paddingElements.forEach(
          (paddingElement) => (paddingElement.style.paddingRight = ""),
        );
      }

      return unblocked;
    },
    canBlock: origin.canBlock,
  };
}

export function BlockerWithoutAnyPadding(
  origin: IBlocker,
  elementsToRemove: HTMLElement[],
): IBlocker {
  return {
    block() {
      const result = origin.block();

      elementsToRemove.forEach((paddingElement) => {
        paddingElement.style.paddingRight = "";
      });

      return result;
    },
    unblock() {
      const unblocked = origin.unblock();

      elementsToRemove.forEach(
        (paddingElement) => (paddingElement.style.paddingRight = ""),
      );

      return unblocked;
    },
    canBlock: origin.canBlock,
  };
}

const blockersName = Symbol("blockers");

export function Blockers(element: HTMLElement): IBlockers {
  const elementWithBlockers = element as HTMLElement & {
    [blockersName]: IBlockers | undefined;
  };

  if (elementWithBlockers[blockersName] === undefined) {
    elementWithBlockers[blockersName] = new Set();
  }

  return elementWithBlockers[blockersName];
}
