import mapObject from "@/helpers/mapObject";
import { SyntheticEvent, useRef } from "react";
import { DetailedHTMLProps, HTMLAttributes, ReactNode, useMemo } from "react";

type Attrs = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
type OnlyCaptureEvents = {
  [Key in keyof Attrs as Key extends `on${string}Capture` ? Key : never]: (
    ...params: Parameters<Attrs[Key]>
  ) => boolean | Promise<boolean>;
};

const canIngoreStop = new WeakMap();

export default function CheckBeforeAction({
  children,
  className,
  ...events
}: {
  children: ReactNode;
  className?: string;
} & OnlyCaptureEvents) {
  const wrapElement = useRef<HTMLDivElement>(null);

  const preparedEvents = useMemo(
    () =>
      mapObject(events, (handler) => async (event: SyntheticEvent) => {
        if (
          !handler ||
          canIngoreStop.has(event.nativeEvent) ||
          event.target === wrapElement.current
        )
          return;

        const canDoAction = handler(event as any);

        if (canDoAction === true) {
          return;
        }

        event.stopPropagation();

        if (canDoAction instanceof Promise) {
          const result = await canDoAction;

          if (result) {
            const validatedEvent = new Event(event.type, { bubbles: true });

            canIngoreStop.set(validatedEvent, true);

            event.target.dispatchEvent(validatedEvent);
          }
        }
      }),
    Object.values(events),
  );

  return (
    <div className={className} ref={wrapElement} {...preparedEvents}>
      {children}
    </div>
  );
}
