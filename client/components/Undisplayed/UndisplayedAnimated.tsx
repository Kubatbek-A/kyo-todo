import { ReactNode, useState } from "react";
import Undisplayed from "./Undisplayed";
import useSSRLayoutEffect from "@/hooks/useSSRLayoutEffect/useSSRLayoutEffect";
import useTimeoutValue from "@/hooks/useTimeoutValue/useTimeoutValue";
import maybeFunction from "@/helpers/maybeFunction";

export default function UndisplayedAnimated(props: {
  isVisible: boolean;
  ms: number;
  children: ReactNode | ((visible: boolean) => ReactNode);
}) {
  const [isDisplayed, setIsDisplayed] = useState(props.isVisible);

  const isVisibleDelayed = useTimeoutValue(props.isVisible, 100, [false]);

  useSSRLayoutEffect(() => {
    if (props.isVisible) {
      if (!isDisplayed) {
        setIsDisplayed(true);
      }

      return undefined;
    }

    const timeout = setTimeout(() => {
      setIsDisplayed(false);
    }, props.ms);

    return () => clearTimeout(timeout);
  }, [props.isVisible, props.ms]);

  return (
    <Undisplayed $isVisible={isDisplayed}>
      {maybeFunction(props.children)(isVisibleDelayed)}
    </Undisplayed>
  );
}
