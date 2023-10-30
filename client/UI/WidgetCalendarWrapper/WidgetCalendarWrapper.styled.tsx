import styled, { css, keyframes } from "styled-components";
import { colors } from "@/helpers/styleColors";
import { media } from "@/helpers/styleBreakpoints";
import { C1, P7 } from "../Typography";
import { Button } from "../Button/Button";

export const StyledCalendarTitle = styled(C1)`
  color: ${colors.white};
`;

export const StyledConfirmButton = styled(Button)`
  width: 100%;
  margin-top: 32px;
  background-color: ${colors.white} !important;
  color: ${colors.black} !important;

  &:hover {
    background-color: ${colors.transparent} !important;
    color: ${colors.white} !important;
    border: 1px solid ${colors.white} !important;
  }

  ${media.laptop} {
    margin-top: 0;
  }
`;

export const WidgetCalendarContainer = styled.div`
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
  gap: 8px;
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
