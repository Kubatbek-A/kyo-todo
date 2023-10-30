import styled, { css } from "styled-components";
import { Button } from "antd";
import { media } from "@/helpers/styleBreakpoints";

interface IStyledButton {
  vectoricon?: "Right" | "Left" | "All" | undefined;
  $iconColor?: string;
  $iconColorHover?: string;
}

export const StyledButton = styled(Button)<IStyledButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: fit-content;
  gap: ${({ vectoricon }) => (vectoricon ? "16px" : "8px")};
  background: ${({ type, theme }) =>
    type === "primary"
      ? theme?.antd?.components.Button.colorPrimaryBg
      : theme?.antd?.components.Button.colorBgContainer} !important;
  border: 1px solid ${({ theme }) => theme?.antd?.components.Button.colorBorder} !important;
  border-radius: 100px;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: ${({ type, theme }) =>
    type === "primary"
      ? theme?.antd?.components.Button.colorPrimaryText
      : theme?.antd?.components.Button.colorText} !important;
  font-family: var(--font-suisseIntl), sans-serif;
  padding: ${({ vectoricon }) => (vectoricon === "All" ? "0 4px" : "0 24px")};
  padding-left: ${({ vectoricon }) => vectoricon === "Left" && "4px"};
  padding-right: ${({ vectoricon }) => vectoricon === "Right" && "4px"};
  opacity: ${(props) => props.disabled && "0.2"};

  .icon-primary {
    width: 46px;
    height: 46px;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    color: ${({ type, theme }) =>
      type === "primary"
        ? theme?.antd?.components.Button.colorPrimaryText
        : theme?.antd?.components.Button.colorText} !important;

    ${(props) =>
      !props.$iconColor &&
      css`
        svg {
          fill: ${props.type === "primary"
            ? props.theme?.antd?.components.Button.colorText
            : props.theme?.antd?.components.Button.colorPrimaryText};
        }
      `}
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }

  ${(props) =>
    !props.disabled &&
    css`
      &:hover,
      &:active {
        background: ${
          props.type === "primary"
            ? props.theme?.antd?.components.Button.colorPrimaryBgHover
            : props.theme?.antd?.components.Button.colorInfoBgHover
        } !important;
        color: ${
          props.type === "primary"
            ? props.theme?.antd?.components.Button.colorText
            : props.theme?.antd?.components.Button.colorPrimaryText
        } !important;

        .icon-primary {
          background: ${
            props.type === "primary"
              ? props.theme?.antd?.components.Button.colorPrimaryBgHover
              : props.theme?.antd?.components.Button.colorInfoBgHover
          } !important;

          color: ${
            props.type === "primary"
              ? props.theme?.antd?.components.Button.colorText
              : props.theme?.antd?.components.Button.colorPrimaryText
          } !important; 

          ${
            !props.$iconColorHover &&
            css`
          svg {
            fill: ${
              props.type === "primary"
                ? props.theme?.antd?.components.Button.colorPrimaryText
                : props.theme?.antd?.components.Button.colorText
            } !important;
          `
          }
          }
        }
      }
    `};

  :focus-visible {
    outline: none !important;
    box-shadow: 0px 0px 0px 1px #4e6f63 !important;
  }
  div {
    display: none;
  }

  ${media.tablet} {
    padding: ${({ vectoricon }) => (vectoricon === "All" ? "0 4px" : "0 32px")};
    padding-left: ${({ vectoricon }) => vectoricon === "Left" && "4px"};
    padding-right: ${({ vectoricon }) => vectoricon === "Right" && "4px"};
  }
`;
