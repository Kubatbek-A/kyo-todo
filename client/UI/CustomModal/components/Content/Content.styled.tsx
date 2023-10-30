import { media } from "@/helpers";
import styled from "styled-components";

export type IContentProps = {
  $width?: string;
};

export const Content = {
  Content: styled.div<IContentProps>`
    position: relative;
    background-color: #f0eeeb;
    max-width: 100%;
    min-height: 70px;
    margin: 8px;
    width: 300px;

    ${media.mobileXL} {
      width: 500px;
    }

    ${media.tablet} {
      width: 760px;
    }
  `,
  CloseButton: styled.div`
    position: absolute;
    top: 21px;
    right: 24px;
    display: flex;
    cursor: pointer;
    padding: 6px;
    margin: -6px;
  `,
};
