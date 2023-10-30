import React from "react";
import { FloatLabel } from "./FloatLabel/FloatLabel";
import {
  StyledInput,
  StyledError,
  StyledInputWrapper,
  StyledHintsWrapper,
} from "./Input.styled";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { InputProps } from "antd";
import ConditionalWrapper from "@/components/ConditionalWrapper/ConditionalWrapper";

export interface IInputProps<T extends FieldValues> extends InputProps {
  label?: string;
  value?: string;
  setValue?: (value: string) => void;
  disabled?: boolean;
  description?: string;
  isHideLabel?: boolean;
  className?: string;
  controllerProps: UseControllerProps<T>;
  onClick?: () => void;
  isLabelFloated?: boolean;
  prefix?: string;
  isFilled?: boolean;
  mask?: string;
  error?: string;
}

export const Input = <T extends FieldValues>({
  label = "Label",
  disabled = false,
  description,
  className,
  controllerProps,
  onClick,
  isLabelFloated = true,
  readOnly,
  mask,
  isFilled,
  error: outerError,
  ...rest
}: IInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(controllerProps);
  const status = error?.message ? "error" : "";

  const isFilledLocal = isFilled ?? !!field.value;

  return (
    <ConditionalWrapper
      condition={isLabelFloated}
      wrapper={(children) => (
        <FloatLabel
          label={label}
          isFilled={isFilledLocal}
          isReadOnly={readOnly}
          disabled={disabled}
        >
          {children}
        </FloatLabel>
      )}
    >
      <StyledInputWrapper className={className}>
        <ConditionalWrapper
          condition={!!mask}
          wrapper={(children) => <>{children}</>}
        >
          <StyledInput
            classNames={{ input: className }}
            placeholder={!isLabelFloated ? label : undefined}
            status={status}
            onClick={onClick}
            readOnly={readOnly}
            isFilled={isFilled}
            disabled={disabled}
            {...field}
            {...rest}
          />
        </ConditionalWrapper>
        <StyledHintsWrapper>
          {(error?.message || outerError) && (
            <StyledError>
              {typeof outerError === "string" ? outerError : error?.message}
            </StyledError>
          )}
        </StyledHintsWrapper>
      </StyledInputWrapper>
    </ConditionalWrapper>
  );
};
