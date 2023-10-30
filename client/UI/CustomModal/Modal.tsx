import { ReactNode, useEffect } from "react";
import Base, { BaseCentered } from "./components/Base/Base";
import Content from "./components/Content/Content";
import { IContentProps } from "./components/Content/Content.styled";
import useBlockScroll from "@/hooks/useBlockScroll/useBlockScroll";
import BodyPortal from "../../components/BodyPortal/BodyPortal";
import UndisplayedAnimated from "@/components/Undisplayed/UndisplayedAnimated";
import { HiddenToSide } from "@/components/animated/HiddenToSide";

export default function Modal({
  Position = BaseCentered,
  ...props
}: {
  children: ReactNode;
  isVisible: boolean;
  Position?: (props: { children: ReactNode }) => JSX.Element;
  contentProps?: IContentProps;
  onClose?: () => void;
}) {
  useBlockScroll(props.isVisible);

  useEffect(() => {
    const abortController = new AbortController();

    window.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          props.onClose?.();
        }
      },
      { signal: abortController.signal },
    );

    return () => abortController.abort();
  }, []);

  return (
    <BodyPortal>
      <UndisplayedAnimated isVisible={props.isVisible} ms={300}>
        {(isVisible) => (
          <Base isHidden={!isVisible} onClose={props.onClose}>
            <Position>
              <HiddenToSide $isVisible={isVisible} $scale={0.95}>
                <Content {...props.contentProps} onClose={props.onClose}>
                  {props.children}
                </Content>
              </HiddenToSide>
            </Position>
          </Base>
        )}
      </UndisplayedAnimated>
    </BodyPortal>
  );
}
