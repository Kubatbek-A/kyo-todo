import styled, { css, keyframes } from "styled-components";
import { Modal } from "antd";
import { media } from "@/helpers/styleBreakpoints";
import { colors } from "@/helpers/styleColors";

interface IStyleModal {
  isLargeSide: boolean;
  isCloseWhite: boolean;
}

export const StyledModal = styled(Modal)<IStyleModal>`
  width: 100vw !important;
  max-width: 100vw !important;
  ${({ isLargeSide }) =>
    isLargeSide &&
    css`
      top: 0;
    `};
  padding-bottom: 0;

  ${(props) =>
    props.isLargeSide &&
    css`
      animation-name: ${slideLeftInModalAnimation} !important;

      &.ant-zoom-leave-active {
        animation-name: ${slideLeftOutModalAnimation} !important;
      }
    `}
  .ant-modal-content {
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
      background: transparent;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      padding-left: 2px;
      width: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${colors.gray300};
      border-radius: 10px;
      width: 80%;
    }

    border-radius: 0;
    min-height: 500px;
    margin: ${({ isLargeSide }) => (isLargeSide ? "0 0 0 auto" : "0 auto")};
    padding: 0;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    background-color: ${({ isLargeSide }) =>
      isLargeSide ? colors.white : "transparent"};

    ${media.tablet} {
      width: ${({ isLargeSide }) =>
        isLargeSide ? "calc(100vw - 44px)" : "504px"};
      height: ${({ isLargeSide }) => (isLargeSide ? "100vh" : "fit-content")};
      max-height: ${({ isLargeSide }) =>
        isLargeSide ? "100vh" : "calc(100vh - 48px)"};
    }

    ${media.laptop} {
      width: ${({ isLargeSide }) =>
        isLargeSide ? "calc(100vw - 124px)" : "840px"};
    }

    ${media.desktop} {
      width: ${({ isLargeSide }) =>
        isLargeSide ? "calc(100vw - 172px)" : "840px"};
    }

    .ant-modal-body {
      height: 100%;
    }

    .ant-modal-close {
      ${({ isLargeSide, isCloseWhite }) =>
        isLargeSide
          ? css`
              width: 54px;
              height: 54px;
              background: ${isCloseWhite ? colors.white : colors.black};
              border-radius: 40px;
              top: 14px;
              inset-inline-end: 16px;

              ${media.tablet} {
                top: 24px;
                inset-inline-end: 44px;
              }

              ${media.desktop} {
                inset-inline-end: 60px;
              }
            `
          : css`
              width: 24px;
              height: 24px;
              top: 16px;
              inset-inline-end: 16px;
            `};

      :hover {
        background-color: ${({ isLargeSide }) => !isLargeSide && "transparent"};
      }
    }
  }
`;

export const slideLeftInModalAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
export const slideLeftOutModalAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 1;
    transform: translateX(100%);
  }
`;
