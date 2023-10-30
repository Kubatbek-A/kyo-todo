import styled, { css } from "styled-components";
import { Button } from "antd";
import { media } from "@/helpers/styleBreakpoints";

const size = {
  L: {
    sizeBtn: 112,
    sizeIcon: 32,
  },
  M: {
    sizeBtn: 54,
    sizeIcon: 24,
  },
  S: {
    sizeBtn: 24,
    sizeIcon: 24,
  },
};

type Sizes = typeof size;

export type Size = Sizes[keyof Sizes];

interface IStyledButton {
  scale: "L" | "M" | "S" | Size;
  kind: "primary" | "secondary" | "tertiary";
  color?: string;
  $iconColor?: string;
  $iconColorHover?: string;
}

const getSize = (scale: IStyledButton["scale"]) =>
  typeof scale === "string" ? size[scale] : scale;

export const StyledButton = styled(Button)<IStyledButton>`
  width: ${({ scale }) => getSize(scale).sizeBtn}px !important;
  height: ${({ scale }) => getSize(scale).sizeBtn}px !important;
  border-radius: ${({ kind }) => (kind === "tertiary" ? 4 : 100)}px;
  box-shadow: none !important;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none !important;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: ${(props) => props.$iconColor};

  &:disabled {
    opacity: 0.2;
  }

  svg {
    width: ${({ scale }) => getSize(scale).sizeIcon}px;
    height: ${({ scale }) => getSize(scale).sizeIcon}px;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  ${({ kind, theme, color, $iconColor }) => {
    switch (kind) {
      case "primary":
        return css`
          background-color: ${color ??
          theme.antd.components.Button.colorPrimaryBg} !important;
          border: none !important;
        `;
      case "secondary":
        return css`
          background-color: transparent !important;
          border: 1px solid ${color ?? theme.antd.components.Button.colorBorder} !important;

          ${!$iconColor &&
          css`
            svg {
              fill: ${color ?? theme.antd.components.Button.colorText};
            }
          `}
        `;
      case "tertiary":
        return css`
          background-color: transparent !important;
          border: 1px solid transparent !important;

          ${!$iconColor &&
          css`
            svg {
              fill: ${color ?? theme.antd.components.Button.colorText};
            }
          `}
        `;
    }
  }}
  ${({ kind, theme, color, $iconColorHover }) => css`
    &:not(:disabled) {
      ${media.laptop} {
        &:hover {
          border: 1px solid
            ${color ?? kind === "primary"
              ? theme.antd.components.Button.colorBorder
              : "transparent"} !important;
          background-color: ${color ?? kind === "secondary"
            ? theme.antd.components.Button.colorPrimaryBg
            : "transparent"} !important;

          ${$iconColorHover
            ? css`
                color: ${$iconColorHover};
              `
            : css`
                svg {
                  fill: ${color ?? kind === "secondary"
                    ? theme.antd.components.Button.colorPrimaryText
                    : theme.antd.components.Button.colorText};
                }
              `}
        }
      }
    }
  `}
  &:focus-visible {
    outline: none !important;
    box-shadow: 0 0 0 1px #4e6f63 !important;
  }

  div {
    display: none;
  }

  ${media.tablet} {
    width: ${({ scale }) => getSize(scale).sizeBtn}px !important;
    height: ${({ scale }) => getSize(scale).sizeBtn}px !important;
  }
`;
