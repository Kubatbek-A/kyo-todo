import { media } from "@/helpers/styleBreakpoints";
import { colors } from "@/helpers/styleColors";
import styled from "styled-components";

export const StyledH3 = styled.h3<{ $isUppercase: boolean }>`
  font-size: 28px;
  line-height: 32px;
  color: ${({ theme }) => theme?.antd?.components.Typography.colorText};

  text-transform: ${({ $isUppercase }) =>
    $isUppercase ? "uppercase" : "none"};

  &.mb-menubuffet {
    margin-bottom: 0;
  }

  &.mb-little-menubuffet {
    margin-bottom: var(--space-little-4xs);
  }

  ${media.tablet} {
    font-size: 42px;
    line-height: 44px;
  }

  ${media.desktop} {
    font-size: 46px;
    line-height: 48px;
  }
`;

export const StyledH5 = styled.h5<{ $isUppercase: boolean }>`
  font-size: 22px;
  line-height: 28px;
  color: ${({ theme }) => theme?.antd?.components.Typography.colorText};

  text-transform: ${({ $isUppercase }) =>
    $isUppercase ? "uppercase" : "none"};

  ${media.tablet} {
    font-size: 22px;
    line-height: 28px;
  }

  ${media.desktop} {
    font-size: 24px;
    line-height: 30px;
  }
`;

export const StyledC1 = styled.span<{ $isUppercase: boolean }>`
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme?.antd?.components.Typography.colorText};

  text-transform: ${({ $isUppercase }) =>
    $isUppercase ? "uppercase" : "none"};

  &.color-gray-300 {
    color: ${colors.gray300};
  }
  &.color-gray-400 {
    color: ${colors.gray400};
  }

  &.mb-title-footer-item {
    margin-bottom: var(--space-little-5xs);
  }

  &.mb-type-modal-buffet {
    display: inline-block;
    margin-bottom: var(--space-little-4xs);
  }

  &.mb-address {
    display: inline-block;
    margin-bottom: 24px;

    ${media.tablet} {
      margin-bottom: 32px;
    }
  }
`;

export const StyledP4 = styled.p<{ $isUppercase: boolean }>`
  font-size: 22px;
  line-height: 28px;
  color: ${({ theme }) => theme?.antd?.components.Typography.colorText};

  text-transform: ${({ $isUppercase }) =>
    $isUppercase ? "uppercase" : "none"};

  ${media.tablet} {
    font-size: 22px;
    line-height: 28px;
  }

  ${media.desktop} {
    font-size: 24px;
    line-height: 30px;
  }
`;

export const StyledP6 = styled.p<{
  $isUppercase: boolean;
  $color: string;
}>`
  font-size: 16px;
  line-height: 22px;
  color: ${({ $color, theme }) =>
    $color ? $color : theme?.antd?.components.Typography.colorText};

  text-transform: ${({ $isUppercase }) =>
    $isUppercase ? "uppercase" : "none"};

  &.ml-welcome-desc-main {
    margin-left: 52px;

    ${media.tablet} {
      margin-left: 176px;
    }

    ${media.laptop} {
      margin-left: 240px;
    }

    ${media.desktop} {
      margin-left: 336px;
    }
  }

  &.mb-name-more-info {
    margin-bottom: var(--space-little-6xs);
  }

  &.mw-filming-desc {
    ${media.laptop} {
      max-width: 216px;
    }

    ${media.desktop} {
      max-width: 312px;
    }
  }

  &.mb-footer-link {
    margin-bottom: var(--space-little-6xs);
  }

  &.mb-desc-menu-modal {
    margin-bottom: var(--space-little-4xs);
  }

  &.color-cardbuffet-price {
    color: ${colors.gray400};
  }

  &.color-red-200 {
    color: ${colors.red200};
  }
`;

export const StyledP7 = styled.p<{ $isUppercase: boolean }>`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme?.antd?.components.Typography.colorText};

  text-transform: ${({ $isUppercase }) =>
    $isUppercase ? "uppercase" : "none"};

  &.color-gray-300 {
    color: ${colors.gray300};
  }
`;
