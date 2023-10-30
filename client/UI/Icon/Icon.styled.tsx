import styled from "styled-components";

interface IStyledIcon {
  color: string;
  size: 12 | 16 | 24 | 32 | 64 | number;
}

export const StyledIcon = styled.svg<IStyledIcon>`
  display: inline-block;
  vertical-align: middle;
  width: ${(props) => props.size}px !important;
  height: ${(props) => props.size}px !important;
  fill: ${({ color }) => color};
`;
