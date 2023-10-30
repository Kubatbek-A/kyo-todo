import styled from "styled-components";

interface PixelFixProps {
  $top?: string;
  $left?: string;
}

export const PixelFix = styled.div<PixelFixProps>`
  position: relative;
  top: ${(props) => props.$top ?? "0px"};
  left: ${(props) => props.$left ?? "0px"};
`;

export const PixelFlowFix = styled.div<PixelFixProps>`
  margin-top: ${(props) => props.$top ?? "0px"};
  margin-left: ${(props) => props.$left ?? "0px"};
`;
