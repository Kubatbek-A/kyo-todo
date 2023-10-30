import { ReactNode, useRef } from "react";
import { Base as Styled } from "./Base.styled";
import styled from "styled-components";

export default function Base(props: {
  children: ReactNode;
  isHidden?: boolean;
  onClose?: () => void;
}) {
  const element = useRef<HTMLDivElement>(null);

  return (
    <Styled.Base
      ref={element}
      onClick={(event) => event.target === element.current && props.onClose?.()}
      $isHidden={props.isHidden}
    >
      {props.children}
    </Styled.Base>
  );
}

export const BaseCentered = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  max-height: 100%;
`;

const StyledBaseFullscreen = {
  Base: styled.div`
    position: absolute;
    top: 32px;
    left: 32px;
    right: 32px;
    padding-bottom: 32px;
    pointer-events: none;
  `,
  Inner: styled.div`
    pointer-events: auto;
  `,
};

export function BaseFullscreen(props: { children: ReactNode }) {
  return (
    <StyledBaseFullscreen.Base>
      <StyledBaseFullscreen.Inner>{props.children}</StyledBaseFullscreen.Inner>
    </StyledBaseFullscreen.Base>
  );
}
