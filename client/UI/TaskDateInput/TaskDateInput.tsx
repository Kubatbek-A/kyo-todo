import { mediaRevers } from "@/helpers/index";
import { colors } from "@/helpers/styleColors";
import { useMediaQuery } from "@/helpers/use-media-query";
import dayjs from "dayjs";
import { useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import WidgetCalendarWrapper from "../WidgetCalendarWrapper/WidgetCalendarWrapper";
import { DateInputStyledWrapper } from "./TaskDateInput.styled";
import { ICalendarProps } from "../Calendar/Calendar";
import { IInputProps, Input } from "../Input/Input";
import { Icon } from "../Icon/Icon";
import { Modal } from "../Modal/Modal";

export interface DateInputProps<T extends FieldValues> extends IInputProps<T> {
  label: string;
  calendarProps?: ICalendarProps;
  valueFormat?: string;
  displayFormat?: string;
  render?: (displayValue: string, isFilledDate: boolean) => JSX.Element;
}

export interface ITaskDateTime {
  date: string;
  time: string;
}

function isTaskDateTime(object: any): object is ITaskDateTime {
  return "date" in object && "time" in object;
}

const TaskDateInput = <T extends FieldValues>({
  label,
  controllerProps,
  calendarProps,
  valueFormat = "YYYY-MM-DD",
  displayFormat,
  render,
  ...rest
}: DateInputProps<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { field } = useController(controllerProps);

  const isMobile = useMediaQuery(mediaRevers.tablet);
  const isTablet = useMediaQuery(mediaRevers.laptop);
  const isMobileOrTablet = isMobile || isTablet;
  const [isSelectTimeStep, setIsSelectTimeStep] = useState(false);

  const handleConfirm = (date: ITaskDateTime) => {
    field.onChange(date);
    setIsModalOpen(false);
  };

  const selectedDate = dayjs(field.value?.date ?? Date.now()).toDate();

  if (field.value?.time) {
    const [hours, minutes] = field.value.time.split(":");

    if (selectedDate) {
      selectedDate?.setHours(+hours);
      selectedDate?.setMinutes(+minutes);
    }
  }

  const displayValue =
    field.value &&
    isTaskDateTime(field.value) &&
    field.value.date &&
    field.value.time
      ? `${dayjs(field.value.date).format(
          displayFormat || valueFormat,
        )} ${dayjs(selectedDate).format("hh:mm A")}`
      : "";

  const isFilledDate =
    field.value && (!!field.value.date || !!field.value.time);

  const goToSelectTimeStep = (isTimeStep: boolean) => {
    setIsSelectTimeStep(isTimeStep);
  };

  return (
    <>
      <DateInputStyledWrapper onClick={() => setIsModalOpen(true)}>
        {render ? (
          render(displayValue, isFilledDate)
        ) : (
          <Input
            label={label}
            suffix={<Icon name="icon-24-calendar" color={colors.black} />}
            isLabelFloated={true}
            readOnly={true}
            controllerProps={controllerProps}
            value={displayValue}
            isFilled={isFilledDate}
            {...rest}
          />
        )}
      </DateInputStyledWrapper>
      <Modal
        open={isModalOpen}
        isCloseWhite={isMobileOrTablet && !isSelectTimeStep}
        onCancel={() => setIsModalOpen(false)}
      >
        <WidgetCalendarWrapper
          onConfirm={handleConfirm}
          valueFormat={valueFormat}
          calendarProps={calendarProps}
          onSelectDate={goToSelectTimeStep}
        />
      </Modal>
    </>
  );
};

export default TaskDateInput;
