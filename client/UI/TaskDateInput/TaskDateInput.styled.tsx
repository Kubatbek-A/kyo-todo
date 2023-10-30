import styled, { css, keyframes } from "styled-components";
import { colors } from "@/helpers/styleColors";
import { media } from "@/helpers/styleBreakpoints";
import { C1, P7 } from "../Typography";
import { Button } from "../Button/Button";

export const DateInputStyledWrapper = styled.div`
  flex: 1;
  cursor: pointer;
`;

export const StyledCalendarTitle = styled(C1)`
  color: ${colors.white};
`;

export const StyledConfirmButton = styled(Button)`
  width: 100%;
`;

export const WidgetCalendarWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  ${media.laptop} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 10;
  display: flex;
  align-self: center;
  justify-content: center;

  &::before {
    content: "";
    width: 75px;
    height: 75px;
    display: inline-block;
    border-width: 2px;
    border-color: ${colors.gray300};
    border-top-color: ${colors.black};
    animation: ${keyframes`
      100% {
        transform: rotate(360deg);
      }
    `} 1s infinite linear;
    border-radius: 100%;
    border-style: solid;
    align-self: center;
  }
`;

export const CalendarSubmitButton = styled(Button)`
  flex: 1;
`;

export const StyledControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: auto;
  grid-gap: 8px;
`;
export const CalendarControls = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTimesColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 18px;
  height: 100%;

  ${media.tablet} {
    padding: 24px 18px;
  }
`;

export const StyledSelectedDate = styled(P7)`
  text-align: center;
  color: ${colors.gray300};
  margin-bottom: 16px;
`;

export const StyledTimesTitle = styled(C1)`
  display: block;
  color: ${colors.black};
  margin-bottom: 24px;
  text-align: center;

  ${media.tablet} {
    margin-bottom: 32px;
  }
`;

export const TimesBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
  margin-bottom: 24px;
`;

export const TimeButton = styled(Button)<{ isActive: boolean }>`
  width: auto;

  ${(props) =>
    props.isActive &&
    css`
      background-color: ${colors.black} !important;
      color: ${colors.white} !important;
    `}
`;
