import { mediaRevers } from "@/helpers/index";
import { useMediaQuery } from "@/helpers/use-media-query";
import dayjs from "dayjs";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import {
  CalendarControls,
  CalendarSubmitButton,
  StyledCalendarTitle,
  StyledConfirmButton,
  StyledControlWrapper,
  StyledSelectedDate,
  StyledTimesColumn,
  StyledTimesTitle,
  TimeButton,
  TimesBlock,
  WidgetCalendarContainer,
} from "./WidgetCalendarWrapper.styled";
import CustomThemeProvider from "../Provider/themeProvider";
import { Icon } from "../Icon/Icon";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import { Calendar, ICalendarProps } from "../Calendar/Calendar";

const TIMES = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export interface TaskDateModalProps {
  showNote?: boolean;
  calendarProps?: ICalendarProps;
  valueFormat?: string;
  isLoading?: boolean;
  isFullHeightCalendar?: boolean;
  onConfirm: (selectedDate: ITaskDateTime) => void;
  onSelectDate?: (isTimeStep: boolean) => void;
}

export interface ITaskDateTime {
  date: string;
  time: string;
}

const WidgetCalendarWrapper = <T extends FieldValues>({
  calendarProps,
  valueFormat = "YYYY-MM-DD",
  isLoading = false,
  isFullHeightCalendar = true,
  onConfirm,
  onSelectDate,
}: TaskDateModalProps) => {
  const isMobile = useMediaQuery(mediaRevers.tablet);
  const isTablet = useMediaQuery(mediaRevers.laptop);
  const isMobileOrTablet = isMobile || isTablet;

  const [isDateConfirmed, setIsDateConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const handleDateConfirm = () => {
    setIsDateConfirmed(true);
    onSelectDate?.(true);
  };

  const handleBack = () => {
    setIsDateConfirmed(false);
    setSelectedTime(undefined);
    onSelectDate?.(false);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const result: ITaskDateTime = {
        date: dayjs(selectedDate).format(valueFormat),
        time: selectedTime,
      };

      onConfirm(result);
    }
  };

  const getMonthEdges = (date?: Date): [string, string] => {
    const monthDate = dayjs(date);
    if (monthDate.isBefore(undefined, "month")) {
      return ["", ""];
    }
    const startDate = monthDate.startOf("month").format(valueFormat);
    const endDate = monthDate.endOf("month").format(valueFormat);
    return [startDate, endDate];
  };

  const [monthEdges, setMonthEdges] = useState<[string, string]>(
    getMonthEdges(),
  );
  const handleMonthChange = (date: Date) => {
    setSelectedDate(undefined);
    setMonthEdges(getMonthEdges(date));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
  };

  return (
    <WidgetCalendarContainer>
      {!isMobileOrTablet || !selectedDate || !isDateConfirmed ? (
        <Calendar
          value={selectedDate}
          title={
            <StyledCalendarTitle $isUppercase>
              Task due date
            </StyledCalendarTitle>
          }
          isFullHeight={isFullHeightCalendar}
          footer={
            isMobileOrTablet ? (
              <CustomThemeProvider>
                <StyledConfirmButton
                  type="primary"
                  disabled={!selectedDate}
                  onClick={handleDateConfirm}
                  aria-label="Next"
                >
                  Next
                </StyledConfirmButton>
              </CustomThemeProvider>
            ) : null
          }
          {...calendarProps}
          onChange={handleDateSelect}
          onMonthChange={handleMonthChange}
        />
      ) : null}
      {!isMobileOrTablet || (selectedDate && isDateConfirmed) ? (
        <StyledTimesColumn>
          {isMobileOrTablet && selectedDate ? (
            <StyledSelectedDate>
              {dayjs(selectedDate).format("MMM DD, YYYY")}
            </StyledSelectedDate>
          ) : null}
          <StyledTimesTitle $isUppercase={true}>
            What deadline?
          </StyledTimesTitle>
          {selectedDate ? (
            <TimesBlock>
              {TIMES.map((time) => {
                const [hours, minutes] = time.split(":");
                selectedDate?.setHours(+hours);
                selectedDate?.setMinutes(+minutes);
                const visibleTime = dayjs(selectedDate).format("hh:mm A");
                return (
                  <TimeButton
                    key={time}
                    isActive={selectedTime === time}
                    onClick={() => setSelectedTime(time)}
                  >
                    {visibleTime}
                  </TimeButton>
                );
              })}
            </TimesBlock>
          ) : (
            <StyledTimesTitle $isUppercase={true}>
              First select date
            </StyledTimesTitle>
          )}

          <StyledControlWrapper>
            <CalendarControls>
              {isMobileOrTablet && (
                <ButtonIcon
                  aria-label="Back"
                  onClick={handleBack}
                  size="M"
                  type="secondary"
                  icon={<Icon name="icon-54-arrow-left" />}
                />
              )}
              <CalendarSubmitButton
                type="primary"
                disabled={!selectedTime || !selectedDate}
                onClick={handleConfirm}
                loading={isLoading}
              >
                Confirm
              </CalendarSubmitButton>
            </CalendarControls>
          </StyledControlWrapper>
        </StyledTimesColumn>
      ) : null}
    </WidgetCalendarContainer>
  );
};

export default WidgetCalendarWrapper;
