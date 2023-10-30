import styled from "styled-components";
import { media } from "@/helpers/index";
import { H3 } from "../Typography";

const StyledCalendarWrap = styled.div<{
  isDouble: boolean;
  isFullHeight?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.custom.components.Calendar.white};
  padding: 24px 18px;
  height: 100vh;
  height: ${(props) => (props.isFullHeight ? "100dvh" : "unset")};
  ${media.tablet} {
    padding: 32px;
    height: unset;
  }

  .react-datepicker {
    border: none;
    min-width: 284px;
    background-color: ${(props) =>
      props.theme.custom.components.Calendar.white};
    transition: all 0.2s;
    display: flex;
    justify-content: space-between;

    &__header {
      border: none;
      background-color: transparent;
      margin: 0;
      padding: 0;
    }

    &__day-names {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      margin-bottom: 8px;

      ${media.tablet} {
        margin-bottom: 12px;
      }
    }

    &__day-name {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-ortica);
      color: ${({ theme }) => theme.custom.components.Calendar.colorDayText};
      font-size: 16px;
      line-height: 22px;
      font-weight: 300;
      width: 40px;
      height: 40px;
      padding: 9px 0;
      margin: 0;

      ${media.tablet} {
        width: 44px;
        height: 44px;
        padding: 11px 2px;
      }
    }

    &__day {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      text-align: center;
      font-size: 16px;
      line-height: 19px;
      font-weight: 300;
      font-family: var(--font-ortica);
      color: ${({ theme }) => theme.custom.components.Calendar.black};
      width: 40px;
      height: 40px;
      padding: 9px 0;
      margin: 0;

      ${media.tablet} {
        width: 44px;
        height: 44px;
        padding: 11px 2px;
      }

      &--outside-month {
        visibility: hidden;
        color: transparent;
      }

      &--today {
        background-color: transparent;
      }

      &:hover:not(&--selected):not(&--disabled) {
        background-color: transparent;
        color: ${({ theme }) => theme.custom.components.Calendar.dayHover};
      }

      &--keyboard-selected {
        background-color: transparent;
      }

      &--selected {
        border-radius: 50%;
        background-color: ${({ theme }) =>
          theme.custom.components.Calendar.black};
        color: ${({ theme }) => theme.custom.components.Calendar.white};
      }

      &--disabled {
        color: ${({ theme }) => theme.custom.components.Calendar.dayDisabled};
        cursor: not-allowed;
      }
    }

    &__week {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px 0;
      border-top: 1px solid
        ${({ theme }) => theme.custom.components.Calendar.borderColor};

      ${media.tablet} {
        padding: 11px 0;
      }

      &:last-child {
        padding-bottom: 0;
      }
    }

    &__month {
      margin: 0;

      &-container {
        width: 100%;

        &:not(:last-child) {
          margin-right: ${({ isDouble }) => (isDouble ? "64px" : "0")};
        }
      }
    }
  }

  .react-datepicker__day--disabled.react-datepicker__day--selected {
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.custom.components.Calendar.black};
    background-color: transparent;
    color: ${({ theme }) => theme.custom.components.Calendar.black};
  }
`;

export const StyledTitleWrapper = styled.div`
  margin-bottom: 24px;
  text-align: center;

  ${media.tablet} {
    margin-bottom: 32px;
  }
`;

export const StyledFooterWrapper = styled.div`
  margin: auto auto 0;
  width: 100%;

  ${media.tablet} {
    margin-top: 93px;
  }

  ${media.laptop} {
    margin-top: 64px;
    width: 356px;
  }
`;

const StyledHeader = styled.div<{ isDouble: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.custom.components.Calendar.black};
  svg {
    fill: ${({ theme }) => theme.custom.components.Calendar.black};
  }
  ${media.tablet} {
    margin-bottom: 24px;
  }
`;

const StyledNavigationWrap = styled.div<{ isHidden: boolean }>`
  visibility: ${({ isHidden }) => (isHidden ? "hidden" : "initial")};
`;

const StyledMonth = styled(H3)`
  color: ${({ theme }) => theme.custom.components.Calendar.black};
`;

export { StyledCalendarWrap, StyledHeader, StyledNavigationWrap, StyledMonth };
