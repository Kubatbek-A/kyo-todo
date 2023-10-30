import styled, { css } from "styled-components";

type Position = `${number}${"px" | "%"}`;

export const HiddenToSide = styled.div<{
  $isVisible?: boolean;
  $y?: Position;
  $x?: Position;
  $scale?: number;
}>`
  ${(props) => css`
    transform: translate(
        ${props.$isVisible
          ? "0%, 0%"
          : `${props.$x ?? "0%"}, ${props.$y ?? "10%"}`}
      )
      scale(${props.$isVisible ? 1 : props.$scale ?? 0.8});
    transition:
      transform 0.3s,
      opacity 0.3s;
    ${!props.$isVisible &&
    css`
      pointer-events: none;
    `}
  `}
`;
