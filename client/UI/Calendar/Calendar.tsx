import React from "react";
import {
  StyledCalendarWrap,
  StyledFooterWrapper,
  StyledHeader,
  StyledMonth,
  StyledNavigationWrap,
  StyledTitleWrapper,
} from "./Calendar.styled";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

import { mediaRevers } from "@/helpers/index";
import { colors } from "@/helpers/styleColors";
import { Modify } from "@/helpers/utils";
import dayjs from "dayjs";
import { Icon } from "../Icon/Icon";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import { useMediaQuery } from "@/helpers/use-media-query";

export type ICalendarProps = Modify<
  ReactDatePickerProps,
  {
    isDouble?: boolean;
    className?: string;
    title?: React.ReactNode;
    footer?: React.ReactNode;
    value?: Date;
    isFullHeight?: boolean;
    onChange?: (date: Date) => void;
  }
>;

export const Calendar = (props: ICalendarProps) => {
  const {
    isDouble,
    className,
    title,
    footer,
    onChange,
    value,
    isFullHeight = true,
    ...rest
  } = props;
  const isMobile = useMediaQuery(mediaRevers.tablet);
  const isTablet = useMediaQuery(mediaRevers.laptop);

  const isDoubleCalendar = !!isDouble && !isMobile && !isTablet;
  const handleChange = (date: Date) => {
    onChange?.(date);
  };

  return (
    <StyledCalendarWrap isDouble={isDoubleCalendar} className={className}>
      {title ? <StyledTitleWrapper>{title}</StyledTitleWrapper> : null}
      <DatePicker
        selected={value}
        formatWeekDay={(nameOfDay) => nameOfDay?.toString().slice(0, 1)}
        selectsRange={false}
        inline={true}
        monthsShown={isDoubleCalendar ? 2 : 1}
        renderCustomHeader={({
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => {
          return (
            <StyledHeader isDouble={isDoubleCalendar}>
              <StyledNavigationWrap
                isHidden={isDoubleCalendar && customHeaderCount === 1}
              >
                <ButtonIcon
                  type="tertiary"
                  size="S"
                  icon={
                    <Icon
                      name="icon-24-arrow-left"
                      size={24}
                      color={colors.white}
                    />
                  }
                  color={colors.white}
                  onClick={decreaseMonth}
                />
              </StyledNavigationWrap>

              <StyledMonth $isUppercase={true}>
                {monthDate.toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </StyledMonth>

              <StyledNavigationWrap
                isHidden={!customHeaderCount && isDoubleCalendar}
              >
                <ButtonIcon
                  type="tertiary"
                  size="S"
                  icon={
                    <Icon
                      name="icon-24-arrow-right"
                      size={24}
                      color={colors.white}
                    />
                  }
                  disabled={dayjs(monthDate).add(1, "month")}
                  color={colors.white}
                  onClick={increaseMonth}
                />
              </StyledNavigationWrap>
            </StyledHeader>
          );
        }}
        onChange={handleChange}
        {...rest}
      />
      {footer ? <StyledFooterWrapper>{footer}</StyledFooterWrapper> : null}
    </StyledCalendarWrap>
  );
};
