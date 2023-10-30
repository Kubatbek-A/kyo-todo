import styled, { css } from "styled-components";
import { P7 } from "../Typography";

export const baseHeight = 51;

export type BaseProps = {
  $withBackground?: string;
};

export const StyledRoundBase = {
  Wrap: styled.div`
    position: relative;
    max-width: 100%;
    min-width: 100%;
  `,
  Base: styled.div<BaseProps>`
    border-radius: 26px;
    height: ${baseHeight}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 21px;
    padding-right: 22px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 300;
    font-family: "SuisseIntl", sans-serif;
    max-width: 100%;
    min-width: 100%;
    text-align: left;

    ${(props) =>
      props.$withBackground
        ? css`
            background-color: ${props.$withBackground};
            border: none;
          `
        : css`
            border: 1px solid #ceccc6;
            background: none;
          `}
  `,
  RightIcon: styled.div`
    padding-left: 6px;
  `,
  LeftIcon: styled.div`
    padding-right: 6px;
  `,
  Error: styled.div`
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
    color: #ac4825;
  `,
};

export const Text = styled(P7)`
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Icon = styled.div<{ $isReversed?: boolean }>`
  transform-origin: center;
  transform: rotate(${(props) => (props.$isReversed ? -180 : 0)}deg);
  transition: transform 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
`;
